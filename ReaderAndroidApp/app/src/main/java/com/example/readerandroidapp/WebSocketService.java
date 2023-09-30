package com.example.readerandroidapp;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import androidx.annotation.Nullable;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import java.net.InetSocketAddress;

public class WebSocketService extends Service {
    private WebSocketServer wss = null;

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        this.wss = new WebSocketServer(new InetSocketAddress(8887), Runtime.getRuntime().availableProcessors(), null) {
            @Override
            public void onOpen(WebSocket conn, ClientHandshake handshake) {

            }

            @Override
            public void onClose(WebSocket conn, int code, String reason, boolean remote) {
                System.out.println("Server closed.");
            }

            @Override
            public void onMessage(WebSocket conn, String message) {
                System.out.println(message);
                conn.send("WTF");
            }

            @Override
            public void onError(WebSocket conn, Exception ex) {

            }

            @Override
            public void onStart() {
                System.out.println("Server started.");
            }
        };
        this.wss.start();
        return START_STICKY;
    }
    @Override
    public void onDestroy() {
        super.onDestroy();

        try {
            this.wss.stop();
            this.wss = null;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
