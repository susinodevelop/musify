export interface User {
    album_count:             number;
    artist_pick_track_id:    null;
    bio:                     null;
    cover_photo:             null;
    followee_count:          number;
    follower_count:          number;
    handle:                  string;
    id:                      string;
    is_verified:             boolean;
    twitter_handle:          null;
    instagram_handle:        null;
    tiktok_handle:           null;
    verified_with_twitter:   boolean;
    verified_with_instagram: boolean;
    verified_with_tiktok:    boolean;
    website:                 null;
    donation:                null;
    location:                string;
    name:                    string;
    playlist_count:          number;
    profile_picture:         ProfilePicture;
    repost_count:            number;
    track_count:             number;
    is_deactivated:          boolean;
    is_available:            boolean;
    erc_wallet:              string;
    spl_wallet:              null;
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
