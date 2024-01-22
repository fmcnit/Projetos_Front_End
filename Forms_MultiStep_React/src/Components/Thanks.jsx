import "./Thanks.css"
import{
    BsFillEmojiHeartEyesFill,
    BsFillEmojiSmileFill,
    BsFillEmojiNeutralFill,
    BsFillEmojiFrownFill,
} from "react-icons/bs"

const emojiData = {
    unsatisfied: <BsFillEmojiFrownFill/>,
    neutral: <BsFillEmojiNeutralFill/>,
    satisfied: <BsFillEmojiSmileFill/>,
    very_satisfied: <BsFillEmojiHeartEyesFill/>
}

const Thanks = ({data}) => {
    return ( 
        <div className="thanks-container">
            <h2>Falta Pouco...</h2>
            <h4>Sua opinião é muito importante!</h4>
            <p>Para concluir clique no botão abaixo de enviar.</p>
            <h3>Sua avaliação, {data.name}:</h3>
            <p className="review-data">
                <span>Satisfação com o produto:</span>
                {emojiData[data.review]}
            </p>
            <p className="review-data">
                <span>Comentário do Cliente:</span>
                <p>{data.comment}</p>
            </p>
        </div>
     );
}
 
export default Thanks;
