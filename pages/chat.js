import React, { useState, useEffect } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import ButtonSendSticker from '../src/components/ButtonSendSticker';
import Loading from '../src/components/Loading';
import { Box, Text, TextField, Image, Button } from '@skynexui/components';

// Como fazer AJAX:
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ2OTY3OSwiZXhwIjoxOTU5MDQ1Njc5fQ.VVe8jYwYVPp9gjsyGk4sfvZIYvHuO-x3qadZV69muIw';
const SUPABASE_URL = 'https://nixjopnfanoejkdifnfo.supabase.co';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// fetch('$(SUPABASE_URL)/rest/v1/messages?select=>', {
//   header: {
//     'Content-Type': 'application/json',
//     'apikey': SUPABASE_ANON_KEY,
//     'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
//   }
// })
//   .then((res) => {
//     return res.json();
//   })
//   .then((response) => {
//     console.log(response);
//   });

export default function ChatPage() {
  const router = useRouter();
  const loggedUser = router.query.username;
  const [mensagem, setMensagem] = useState('');
  const [messageList, setMessageList] = useState([
    // {
    //   id: 1,
    //   from: 'gabwestside',
    //   texto: ':sticker: https://media1.giphy.com/media/BdghqxNFV4efm/200.gif',
    // },
  ]);

  useEffect(() => {
    supabaseClient
      .from('messages')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        // console.log('Dados do nosso banco de dados: ', data);
        setMessageList(data);
      });
  }, []);

  function handleNewMessage(newMessage) {
    const message = {
      // id: messageList.length,
      from: loggedUser,
      text: newMessage,
    };

    supabaseClient
      .from('messages')
      .insert([message])
      .then(({ data }) => {
        // console.log('Creating new messages: ', data);

        //setMessageList([data[0], ...messageList]);
      });
  }

  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        scrollbarWidth: 'none',
        color: appConfig.theme.colors.neutrals['000'],
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
          scrollbarWidth: 'none',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
            scrollbarWidth: 'none',
          }}
        >
          <MessageList messages={messageList} />

          {/* {messageList.map((mensagemAtual) => {
            return <li key={mensagemAtual.id}>
                {mensagemAtual.from}: {mensagemAtual.text}
            </li>;
          })} */}

          <Box
            as='form'
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              scrollbarWidth: 'none',
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const value = event.target.value;
                setMensagem(value);
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleNewMessage(mensagem);
                  setMensagem('');
                }
              }}
              placeholder='Insira sua mensagem aqui...'
              type='textarea'
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            ></TextField>
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                console.log('Salva esse sticker no banco', sticker);
                handleNewMessage(`:sticker: ${sticker}`);
              }}
            />
            <Button
              variant='tertiary'
              colorVariant='neutral'
              label='Send'

              // onClick={(event) => {
              //   const event = handleNewMessage(mensagem);
              //   setMensagem('');
              // }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text variant='heading5'>Chat</Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href='/'
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  const [loading, setLoading] = useState(false);
  console.log(props);

  return (
    <>
      {loading && <Loading />}
      <Box
        tag='ul'
        styleSheet={{
          overflow: 'scroll',
          display: 'flex',
          flexDirection: 'column-reverse',
          flex: 1,
          color: appConfig.theme.colors.neutrals['000'],
          marginBottom: '16px',
        }}
      >
        {/* {props.messages.map((mensagem) => {
          return (
            <Text
              key={mensagem.id}
              tag='li'
              styleSheet={{
                borderRadius: '5px',
                padding: '6px',
                marginBottom: '12px',
                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                },
              }}
            >
              <Box
                styleSheet={{
                  marginBottom: '8px',
                }}
              >
                <Image
                  styleSheet={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '8px',
                  }}
                  src={`https://github.com/${mensagem.from}.png`}
                />
                <Text tag='strong'>{mensagem.from}</Text>
                <Text
                  styleSheet={{
                    fontSize: '10px',
                    marginLeft: '8px',
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag='span'
                >
                  {new Date().toLocaleDateString()}
                </Text>
              </Box>
              {mensagem.text.startsWith(':sticker:') ? (
                <Image src={mensagem.text.replace(':sticker:', '')} />
              ) : (
                mensagem.text
              )}
            </Text>
          );
        })} */}
      </Box>
    </>
  );
}
