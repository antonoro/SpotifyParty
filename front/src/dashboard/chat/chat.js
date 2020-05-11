import React, { useState, useEffect } from 'react';

import './chat.css';

function Chat(props) {

    const [selectedGroup, setGroup] = useState( null );
    const [author, setAuthor] = useState( '' );
    const [messageCollection, setMessages] = useState([]);
   
    const [err, setErr] = useState(null); 
    
    const setupWS = (group) => {
        var chatSocket = new WebSocket("ws://thespotifyparty.herokuapp.com:3001");

        chatSocket.onopen = () => {
            console.log("WS client connected");

            chatSocket.onmessage = (msg) => {
                console.log("WS client set message:", JSON.parse(msg.data));
                var updatedMessages = JSON.parse(msg.data);
                updatedMessages.map((group, index) => {
                    if(group.groupname === props.group)
                    {
                        setMessages(group.messages);
                    }
                })
                
            }
        }

    }

    useEffect(() => {
        if(props.group !== '')
        {
            setupWS(props.group);
            setAuthor(props.author);
            setGroup(props.group);
            setMessages([]);
        }
    }, [props.group]);

    useEffect(() => {
        fetch("/allgroupmessages", {
            method:'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({group: props.group}), 
        })
        .then((res) => res.json())
        .then((res) => {
            if(!res.success)
            {
                console.log("No group registered");
                return;
            }
            else{
            console.log("Setting messageCollection", res.data.messages);
            setMessages(res.data.messages);
            }
        })
        .catch((err) => setErr(err));
    }, [selectedGroup]);

    const sendMessage = (event) => {
        event.preventDefault();
        
        var group = event.target[0].value;
        var author = event.target[1].value;
        var writtenmessage = event.target[2].value;

        fetch("/sendchatmessage", 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({group: group, author: author, writtenmessage: writtenmessage}),
        }).then(res => res.json()
        .then(res => {
            console.log("Done.", res);
        }));
    }

    return(
        <div className="chat">
            { props.group === "" ? 
            <div>
                <h2>Group chat</h2>
                <h2>[No group selected]</h2>
            </div>
            :
            <div>
                <h2>Group chat: {selectedGroup}</h2>
                <div id="chatbox" className="row justify-content-center p-3">    
                    <table className="tablechat">
                        <thead>
                            <th className="user"></th>
                            <th className="message"></th>
                        </thead>
                    
                        <tbody>
                        {messageCollection.map((message, index) => 
                            {
                            return(
                                <tr>
                                    <td className="user">{message[1]} said: </td>
                                    <td className="message">{message[0]}</td>
                                </tr>
                            )
                            }
                        )
                        }
                        </tbody>
                    </table>
                </div>
                <div className="row justify-content-center">
                    <form onSubmit={sendMessage} class="form-inline justify-content-left p-3">
                        <div class="form-group mb-2">
                        <input className="form-control" name="group" value={selectedGroup} type="hidden"/>
                        <input className="form-control" name="author" value={author} type="hidden"/>
                            <input className="form-control" name="writtenMessage" type="text" placeholder="Write a message..." required/>
                        </div>
                        <button className="btn btn-success mb-2" type="submit">Send</button>
                    </form>
                </div>    
            </div>
            }
            

        </div>
    );

}

export default Chat;