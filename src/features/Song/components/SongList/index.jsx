import React from 'react';
import PropTypes from 'prop-types';
import Song from '../Song/index';
import './style.scss';

SongList.propTypes = {
    songList: PropTypes.array,
};

SongList.defaultProps = {
    songList: []
}

function SongList({songList}) {
    return (
        <ul className="song_list">
            {songList.map(song => (
                <li key={song.id}>
                    <Song song={song}/>
                </li>
            ))}
        </ul>
    );
}

export default SongList;