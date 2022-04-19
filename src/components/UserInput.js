import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const UserInput = ({uinput, handleInputChange, setShowSuggestions, handleSearch}) => {
    
    const handleKeyUp = (e) => {
        console.log(e.key);
        if(e.key === "Enter"){
            handleSearch();
        }
    }

    const handleFocus = (isFocus) => {
        setShowSuggestions(isFocus);
    }

    return(
        <div className="input-group">
            <div className="input-group-prepend">
                <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <input type="text" id="userInput" value={uinput} className='form-control' onChange={handleInputChange} onKeyUp={handleKeyUp} onFocus={e=> handleFocus(true)} onBlur={e=> handleFocus(false)}  placeholder="Search for..." autoComplete="off" autoFocus />
        </div>
    )
}

export default UserInput;