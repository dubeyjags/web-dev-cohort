function Playlist() {
    // Initialize songs property
    this.songs=[]
}

// Define addSong method on Playlist's prototype
Playlist.prototype.addSong= function(s){
    this.songs.push(s)
}