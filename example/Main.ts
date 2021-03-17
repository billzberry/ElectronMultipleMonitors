﻿import { app } from "electron";
import { IMultiMonitor, MultiMonitor } from "../src/MultiMonitor";

let multiMonitor: IMultiMonitor | null = null;

function onReady() {
    console.log("app ready");

    multiMonitor = MultiMonitor.instance;
    
    const url = "https://google.com";
    // const url = "about:blank";
    
    multiMonitor.openUrl(url, 2).then(() => {
        console.log("Monitor windows are opened & loaded!");
    });
}

app.on('ready', onReady);

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
    
    multiMonitor = null;
});

app.on('activate', function() {
    if (multiMonitor === null) {
        onReady();
    }
});