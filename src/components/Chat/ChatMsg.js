import React from 'react';
import { Image, Text, View } from 'react-native';
import { chatMsgStyles } from '../../styles/chatStyles';

const ChatMsg = ({ author, type, msg }) => {
  return (
    <View>
      {type === 'text' && author === 'YO' ? (
        <View style={chatMsgStyles.msgContainer}>
          <Text style={chatMsgStyles.msgAuthor}>{author}</Text>
          <Text style={chatMsgStyles.msgBody}>{msg}</Text>
        </View>
      ) : null}

      {type === 'text' && author !== 'YO' ? (
        <View style={chatMsgStyles.msgContainerSend}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={chatMsgStyles.msgAuthorSend}>{author}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={chatMsgStyles.msgBody}>{msg}!</Text>
          </View>
        </View>
      ) : null}

      {type === 'img' && author !== 'YO' ? (
        <View style={chatMsgStyles.msgContainerSend}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={chatMsgStyles.msgAuthorSend}>{author}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Image
              source={require(`../../../public/imgs/profileImg.png`)}
              style={chatMsgStyles.msgImg}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={chatMsgStyles.msgBody}>{msg}</Text>
          </View>
        </View>
      ) : null}
    </View>

    // <View style={chatMsgStyles.msgContainer}>
    //   <Text style={chatMsgStyles.msgAuthor}>{author}</Text>
    //   {type === 'img' ? (
    //     <Text style={chatMsgStyles.msgBody}>{msg}</Text>
    //   ) : (
    //     <Image
    //       source={require(`../../../public/imgs/profileImg.png`)}
    //       style={chatMsgStyles.msgImg}
    //     />
    //   )}
    // </View>
  );
};

export default ChatMsg;
