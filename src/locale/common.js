import LocalizedStrings from 'react-localization';

import en from './en';
import ja from './ja';
import ch from './ch';

export default new LocalizedStrings({
    en,
    ch,
    ja
});

// export const localization = () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const lang = urlParams.get('lang') || 'en';
//     const strings = LocalizedStrings({
//         en,
//         it
//     });
//     strings.setLanguage(lang);
//     return strings
// }

// export default localization