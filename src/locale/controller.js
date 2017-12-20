// import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
// import React from 'react';

// const updateQueryStringParameter = (uri, key, value) => {
//     var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
//     var separator = uri.indexOf('?') !== -1 ? "&" : "?";
//     if (uri.match(re)) {
//       return uri.replace(re, '$1' + key + "=" + value + '$2');
//     }
//     else {
//       return uri + separator + key + "=" + value;
//     }
//   }
  
//   const getUrlParameter = (name) => {
//     name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
//     let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
//     let results = regex.exec(window.location);
//     console.log()
//     return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
//   };
  
//   const LanguageController = (props) => (
//       <Dropdown
//         label='Language'
//         placeHolder='English'
//         options={[
//           { key: 'en', text: 'English' },
//           { key: 'ch', text: '中文' },
//           { key: 'ja', text: '日本語' },
//         ]}
//         defaultSelectedKey={getUrlParameter('lang') || 'en'}
//         min={1}
//         onChanged={(l)=> {
//           this.props.changeLanguage(l.key); 
//          window.location = updateQueryStringParameter(window.location.href, 'lang', l.key);;
//          window.location.reload();
//         }}
//     />
//   )

//   export default LanguageController;