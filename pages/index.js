import {  } from '@skynewui/components';
import appConfig from '../config.json';

function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */
      html,
      body,
      #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */
    `}</style>
  );
}
function Title(props) {
  console.log(props);

  const Tag = props.tag;

  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx global>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
        }
      `}</style>
    </>
  );
}

export default function HomePage() {
  return (
    <div>
      <GlobalStyle />
      <Title tag='h1'>Boas vindas de volta!</Title>
      <h2>Discord - Westside's implementation</h2>
    </div>
  );
}
