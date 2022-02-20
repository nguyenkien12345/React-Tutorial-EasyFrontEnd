import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

Song.propTypes = {
    song: PropTypes.object.isRequired,
};

function Song({song}) {
    return (
        <div className="song">
            <div className="song_thumbnail">
                <img src={song.thumbnailUrl} alt={song.name}/>
            </div>
            <p className="song_name">{song.name}</p>
        </div>
    );
}

export default Song;