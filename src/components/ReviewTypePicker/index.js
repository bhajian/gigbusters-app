import React, {useState} from "react";
import {Image, Pressable, StyleSheet, View} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import {FontAwesome, FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";


export default function ReviewTypePicker() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('phone');
    const [items, setItems] = useState([
        {label: '', value: 'phone',
            icon: () => <FontAwesome name={"phone-square"} style={styles.icons} />},
        {label: '', value: 'instagram',
            icon: () => <FontAwesome name={"instagram"} style={styles.icons} />},
        {label: '', value: 'tiktok',
            icon: () => <FontAwesome5 name={"tiktok"} style={styles.icons} />},
        {label: '', value: 'facebook',
            icon: () => <FontAwesome name={"facebook"} style={styles.icons} />},
        {label: '', value: 'twitter',
            icon: () => <FontAwesome name={"twitter"} style={styles.icons} />},
        {label: '', value: 'linkedin',
            icon: () => <FontAwesome name={"linkedin"} style={styles.icons} />},
        {label: '', value: 'web',
            icon: () => <MaterialCommunityIcons name={"web"} style={styles.icons} />}
    ]);
    return (
        <View style={styles.container}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                defaultValue={'phone'}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                textStyle={{
                    fontSize: 10
                }}
                style={{
                    backgroundColor: "#e9eff6",
                    borderWidth: 0,
                }}
                dropDownContainerStyle={{
                    borderWidth: 0,
                    backgroundColor: "#e9eff6",
                }}
                zIndexInverse={1000}

            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 80,
        paddingRight: 3,
        // borderBottomWidth: 0.5,
        // borderColor: 'grey'
    },
    icons: {
        fontSize: 25,
        color: '#000',
    },
});
