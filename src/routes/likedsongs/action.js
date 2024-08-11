export const addLikedSong = (song) => ({
    type: 'ADD_TO_LIKED',
    payload: song,
  });
  
  const initialState = {
    likedSongs: [],
  };
  
  const likeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_LIKED':
        return {
          ...state,
          likedSongs: [...state.likedSongs, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default likeReducer;
  