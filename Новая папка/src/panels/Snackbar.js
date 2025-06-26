import { Snackbar } from '@vkontakte/vkui';
import {Icon28CheckCircleOutline  } from '@vkontakte/icons';

export const SnackbarDone = ({ setSnackbar }) => (
          <Snackbar
            onClose={() => setSnackbar(null)}
            before={<Icon28CheckCircleOutline fill="var(--vkui--color_icon_positive)" />}
            offsetY={30}
          >
            Ссылка скопирована
          </Snackbar>
);

export default Snackbar;