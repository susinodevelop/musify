export interface User {
    album_count:             number;
    artist_pick_track_id:    string;
    bio:                     string;
    cover_photo:             string;
    followee_count:          number;
    follower_count:          number;
    handle:                  string;
    id:                      string;
    is_verified:             boolean;
    twitter_handle:          string;
    instagram_handle:        string;
    tiktok_handle:           string;
    verified_with_twitter:   boolean;
    verified_with_instagram: boolean;
    verified_with_tiktok:    boolean;
    website:                 string;
    donation:                string;
    location:                string;
    name:                    string;
    playlist_count:          number;
    profile_picture:         ProfilePicture;
    repost_count:            number;
    track_count:             number;
    is_deactivated:          boolean;
    is_available:            boolean;
    erc_wallet:              string;
    spl_wallet:              string;
    supporter_count:         number;
    supporting_count:        number;
    total_audio_balance:     number;
    wallet:                  string;
}

export interface ProfilePicture {
    "150x150":   string;
    "480x480":   string;
    "1000x1000": string;
}
