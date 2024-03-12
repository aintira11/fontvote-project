export interface ModelImage {
    ImageID:     number;
    User_Id:      number;
    Name_photo:  string;
    Photo:       string;
    Date_upload: Date;
    Score:       number;
}
export interface modelUser {
    User_Id:  number;
    UserName: string;
    Name:     string;
    Email:    string;
    Password: string;
    Avatar:   any;
    Type:     any;
}
