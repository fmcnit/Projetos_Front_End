import{
    BsFillEmojiHeartEyesFill,
    BsFillEmojiSmileFill,
    BsFillEmojiNeutralFill,
    BsFillEmojiFrownFill,
} from "react-icons/bs"

import './ReviewForm.css'


// eslint-disable-next-line react/prop-types
const ReviewForm = ({ data, updateFieldHandler }) => {
    console.log(data)
    return ( 
        <div>
            <div className="form-control score-container">
                <label className="radio-container">
                    <input 
                    type="radio" 
                    value={"unsatisfied"}
                    onChange={(e) => updateFieldHandler("review", e.target.value)}
                    checked={data.review === "unsatisfied"}
                    name="review" 
                    required />
                    <BsFillEmojiFrownFill/>
                    <p>Insatisfeito</p>
                </label>
                <label className="radio-container">
                    <input 
                    type="radio"
                    value={"neutral"}
                    onChange={(e) => updateFieldHandler("review", e.target.value)} 
                    checked={data.review === "neutral"}
                    name="review" 
                    required/>
                    <BsFillEmojiNeutralFill/>
                    <p>Poderia ser melhor</p>
                </label>
                <label className="radio-container">
                    <input 
                    type="radio" 
                    // eslint-disable-next-line react/prop-types
                    value={"satisfied"}
                    onChange={(e) => updateFieldHandler("review", e.target.value)}
                    name="review" 
                    checked={data.review === "satisfied"}
                    required/>
                    <BsFillEmojiSmileFill/>
                    <p>Satisfeito</p>
                </label>
                <label className="radio-container">
                    <input
                    type="radio" 
                    // eslint-disable-next-line react/prop-types
                    value={"very_satisfied"}
                    onChange={(e) => updateFieldHandler("review", e.target.value)}
                    name="review" required/>
                    checked={data.review === "very_satisfied"}
                    <BsFillEmojiHeartEyesFill/>
                    <p>Muito Satisfeito</p>
                </label>
            </div>

            <div className="form-control">
                <label htmlFor="comment">Comentários:</label>
                <textarea 
                name="comment" 
                id="comment" 
                placeholder="Conte-nos sua experiência com nosso produto" 
                required 
                // eslint-disable-next-line react/prop-types
                value={data.comment || ""}
                onChange={(e) => updateFieldHandler("comment", e.target.value)}></textarea>
                
            </div>
            
        </div>
     );
}
 
export default ReviewForm
