import { setActiveConversation, setIsOpen } from '../../store/slices/conversation/conversationSlice';
import './card.css'

function Card({ id, title, time, content, dispatch, conversation, getMessages ,updatedAt , createdBy }) {
    return (<div class="conv-card" onClick={() => {
        dispatch(setActiveConversation(conversation))
        dispatch(setIsOpen(true));
        getMessages(conversation?.id)
    }}>
        <div class="img"></div>
        <div class="textBox">
            <div class="textContent">
                <p class="h1">{title}</p>
                <span class="span">{new Date(updatedAt).toLocaleString()}</span>
            </div>
            <p class="p">{content}</p>
            <div>
            </div></div></div>)
}

export default Card;
