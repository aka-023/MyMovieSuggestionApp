import defaultprofile from '../assets/defaultprofile.jpg'

const CastCard = ({cast}) => {
    let image = defaultprofile;
    if(cast.profile_path !== undefined){
        image = cast.profile_path;
    }
    
    return(
        <div className="cast-member">
            <div><img className='cast-photo' src={`https://image.tmdb.org/t/p/w500${image}`} alt={cast.name} /></div>
            <div>
            <p>{cast.name}</p>
            <p>as {cast.character}</p>
            </div>
        </div>
    )
}   

export default CastCard;