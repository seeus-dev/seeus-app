import React from "react";
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {AuthActionType, useAuthDispatch} from "../contexts/AuthContext";

/**
 * This component is what is displayed in the main navigation drawer.
 * It renders the list of screens provided in AppNavigationRoot, and renders some extra components.
 */
export default function AppDrawerContent(props) {
    const authDispatch = useAuthDispatch();
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Logout"
                onPress={() => authDispatch({type: AuthActionType.Logout})}
            />
        </DrawerContentScrollView>
    );
}