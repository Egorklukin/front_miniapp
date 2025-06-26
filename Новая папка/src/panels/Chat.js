import React, { useState, useEffect, useRef } from 'react';
import {
  Panel,
  PanelHeader,
  Avatar,
  Snackbar,
  FixedLayout,
  Div,
  Group,
  PanelHeaderButton,
  Textarea,
  IconButton,
  Placeholder,
  Button,
} from '@vkontakte/vkui';
import {
  Icon24CrownCircleFillVkDating,
  Icon28ErrorCircleOutline,
  Icon28DeleteOutline,
  Icon28SendOutline,
  Icon24Copy,
  Icon24Done
} from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import axios from 'axios';
import bridge from '@vkontakte/vk-bridge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SERVER_URL = 'http://localhost:5000/send_message';
const MODAL_PAGE_PRO = 'modal_page_pro';
const STORAGE_KEY = 'chat_history_v2';

const MessageContent = ({ content, image }) => {
  const [copied, setCopied] = useState(false);

  const copyText = async () => {
    try {
      if (typeof content === 'string') {
        await bridge.send('VKWebAppCopyText', {
          text: content,
        });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Ошибка при копировании:', error);
    }
  };

  if (image) {
    return (
      <div>
        <img 
          src={image} 
          alt="Generated content" 
          style={{ 
            maxWidth: '100%', 
            borderRadius: 8,
            marginBottom: 8 
          }} 
        />
        {content && (
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({node, ...props}) => <img style={{maxWidth: '100%'}} {...props} />,
              code: ({node, ...props}) => (
                <code style={{
                  background: 'var(--background_secondary)',
                  padding: '2px 4px',
                  borderRadius: 4,
                  fontFamily: 'monospace'
                }} {...props} />
              ),
              pre: ({node, ...props}) => (
                <pre style={{
                  background: 'var(--background_secondary)',
                  padding: 12,
                  borderRadius: 8,
                  overflowX: 'auto',
                  fontFamily: 'monospace'
                }} {...props} />
              ),
              a: ({node, ...props}) => <a target="_blank" rel="noopener noreferrer" {...props} />
            }}
          >
            {content}
          </ReactMarkdown>
        )}
        <Button 
          mode="secondary" 
          size="s" 
          onClick={copyText} 
          style={{ marginTop: 8 }}
        >
          {copied ? 'Скопировано!' : 'Скопировать текст'}
        </Button>
      </div>
    );
  }

  if (typeof content === 'string') {
    return (
      <div>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({node, ...props}) => <img style={{maxWidth: '100%'}} {...props} />,
            code: ({node, ...props}) => (
              <code style={{
                background: 'var(--background_secondary)',
                padding: '2px 4px',
                borderRadius: 4,
                fontFamily: 'monospace'
              }} {...props} />
            ),
            pre: ({node, ...props}) => (
              <pre style={{
                background: 'var(--background_secondary)',
                padding: 12,
                borderRadius: 8,
                overflowX: 'auto',
                fontFamily: 'monospace'
              }} {...props} />
            ),
            a: ({node, ...props}) => <a target="_blank" rel="noopener noreferrer" {...props} />
          }}
        >
          {content}
        </ReactMarkdown>
        <Button 
          mode="tertiary" 
          size="s" 
          onClick={copyText} 
          style={{ marginTop: 8 }}
        >
          {!copied ? <Icon24Copy/> : <Icon24Done/>}
        </Button>
      </div>
    );
  }
  
  return null;
};

export const Chat = ({ id, fetchedUser, openModal }) => {
  const routeNavigator = useRouteNavigator();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [isStorageLoading, setIsStorageLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const { photo_200 } = { ...fetchedUser };

  const showError = (message = 'Не удалось выполнить запрос') => {
    setSnackbar(
      <Snackbar
        onClose={() => setSnackbar(null)}
        before={<Icon28ErrorCircleOutline fill="var(--vkui--color_icon_negative)" />}
        offsetY={50}
      >
        {message}
      </Snackbar>
    );
  };

  const saveHistory = async (history) => {
    if (!history || history.length === 0) return;
    try {
      await bridge.send('VKWebAppStorageSet', {
        key: STORAGE_KEY,
        value: JSON.stringify(history),
      });
    } catch (error) {
      console.error('Ошибка при сохранении истории:', error);
      showError('Не удалось сохранить историю диалога');
    }
  };

  const loadHistory = async () => {
    setIsStorageLoading(true);
    try {
      const result = await bridge.send('VKWebAppStorageGet', {
        keys: [STORAGE_KEY],
      });
      if (result?.keys?.[0]?.value) {
        const parsedHistory = JSON.parse(result.keys[0].value);
        if (Array.isArray(parsedHistory)) {
          setMessages(parsedHistory);
        }
      }
    } catch (error) {
      console.error('Ошибка при загрузке истории:', error);
      showError('Не удалось загрузить историю диалога', error);
    } finally {
      setIsStorageLoading(false);
    }
  };

  useEffect(() => {
    if (!isStorageLoading && messages.length > 0) {
      saveHistory(messages);
    }
  }, [messages, isStorageLoading]);

  useEffect(() => {
    loadHistory();
  }, []);

  const sendMessage = async () => {
    if (!inputValue.trim() || loading) return;

    const userMessage = { role: 'user', content: inputValue };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setLoading(true);

    try {
      const response = await axios.post(SERVER_URL, {
        message: inputValue,
        history: messages,
      });

      const { answer, image } = response.data;
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: answer, image },
      ]);
    } catch (error) {
      console.error('Request error:', error);
      showError(error.message || 'Ошибка при отправке сообщения');
    } finally {
      setLoading(false);
    }
  };

  const sendStartMessage = async () => {
    if (loading) return;
    
    setLoading(true);

    try {
      const response = await axios.post(SERVER_URL, {
        message: "Что ты умеешь? Расскажи подробно",
        history: messages,
      });

      const { answer, image } = response.data;
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: answer, image },
      ]);
    } catch (error) {
      console.error('Request error:', error);
      showError(error.message || 'Ошибка при отправке сообщения');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearHistory = async () => {
    try {
      await bridge.send('VKWebAppStorageSet', {
        key: STORAGE_KEY,
        value: JSON.stringify([]),
      });
      setMessages([]);
    } catch (error) {
      console.error('Ошибка при очистке истории:', error);
      showError('Не удалось очистить историю');
    }
  };

  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <PanelHeaderButton onClick={clearHistory} aria-label="delete">
            <Icon28DeleteOutline />
          </PanelHeaderButton>
        }
        after={
          <PanelHeaderButton onClick={() => openModal(MODAL_PAGE_PRO)} aria-label="subscrive_pro">
            <Icon24CrownCircleFillVkDating />
          </PanelHeaderButton>
        }
      >
        Чат
      </PanelHeader>
      
      <Group
        style={{
          height: 'calc(100vh - 140px)',
          overflowY: 'auto',
          paddingBottom: 80,
        }}
      >
        {isStorageLoading ? (
          <Div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
            <div
              style={{
                width: 24,
                height: 24,
                border: '3px solid var(--accent)',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'rotate 1s linear infinite',
              }}
            />
          </Div>
        ) : messages.length === 0 ? (
          <Placeholder
            header="Начните диалог"
            action={
              <Button 
                size="l" 
                onClick={sendStartMessage}
                disabled={loading}
                loading={loading}
              >
                Запустить
              </Button>
            }
          >
            Задайте интересующий вас вопрос
          </Placeholder>
        ) : (
          <div style={{ padding: 12 }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                  alignItems: 'flex-start',
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <Avatar
                  size={36}
                  src={
                    msg.role === 'user'
                      ? photo_200
                      : 'https://cdn-icons-png.flaticon.com/512/6793/6793001.png'
                  }
                />
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: msg.role === 'user'
                      ? '16px 0 16px 16px'
                      : '0 16px 16px 16px',
                    background: msg.role === 'user'
                      ? 'var(--button_primary_background)'
                      : 'var(--background_content)',
                    color: msg.role === 'user'
                      ? 'var(--text_primary_invariably)'
                      : 'var(--text_primary)',
                    wordBreak: 'break-word',
                  }}
                >
                  <MessageContent content={msg.content} image={msg.image} />
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center',
                margin: '16px 0'
              }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    border: '3px solid var(--accent)',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'rotate 1s linear infinite',
                  }}
                />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </Group>
      
      <FixedLayout filled vertical="bottom">
        <Div>
          <Textarea
            value={inputValue}
            placeholder="Напишите сообщение..."
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputValue(e.target.value)}
            after={
              <IconButton
                label="Отправить"
                onClick={sendMessage}
                disabled={!inputValue.trim() || loading}
              >
                <Icon28SendOutline />
              </IconButton>
            }
          />
        </Div>
      </FixedLayout>
      
      {snackbar}
    </Panel>
  );
};