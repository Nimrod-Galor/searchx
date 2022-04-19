import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

const Autocomplete = ({autoSuggestion, suggestionSelected}) => {

    const preventDefault = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleSuggetionSelect = (e) => {
        e.preventDefault();
        e.stopPropagation();
        suggestionSelected(e.target.dataset.term);
    };

    return(
        
            <div id="autocomplete" className='autocomplete'>
                {autoSuggestion.map((item, index) => <div className='suggestion' key={"autocompleteItem-" + index} data-term={item.title} onClick={handleSuggetionSelect} onMouseDown={preventDefault}>
                    <FontAwesomeIcon icon={item.history ? faClockRotateLeft : faSearch} /> {item.title} </div>)}
            </div>
        
    );
}

export default Autocomplete;