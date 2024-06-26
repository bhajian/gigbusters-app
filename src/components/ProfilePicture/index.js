import React from "react";
import {Image} from "react-native";

export default function ProfilePicture({image, size = 40}) {
    return (
        <Image
            source={{uri : image}}
            style={{
                width: size,
                height: size,
                borderRadius: size,
            }}
        />
    );
}
