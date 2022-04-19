
const Results = ({searchResults, searchDuration}) => {

    if(searchDuration === 0){
        return(<></>);
    }
    
    return(
        <div id="results">
            <div id="meta">
                found {searchResults.length} results in {searchDuration} milliseconds.
            </div>
            {searchResults.map((item, index) => <div key={"resItem-" + index}><a href={item.url} target='_blank'>{item.title}</a><div>{item.description}</div></div>)}
        </div>
    )
}

export default Results;