// month-locale.js
import dayjs from 'dayjs';
import viVN from 'antd/es/date-picker/locale/vi_VN';

const customLocale = {
    ...viVN,
    lang: {
        ...viVN.lang,
        shortMonths: Array.from({ length: 12 }, (_, i) =>
            String(i + 1).padStart(2, '0')
        ),
    },
};

export default customLocale;
