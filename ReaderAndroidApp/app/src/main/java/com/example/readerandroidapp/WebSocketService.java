package com.example.readerandroidapp;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;
import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import java.net.InetSocketAddress;

public class WebSocketService extends Service {
    private WebSocketServer wss = null;
    IBinder localBinder = new LocalBinder();

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

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

    @Override
    public IBinder onBind(Intent intent) {
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
                Intent intentConnection = new Intent();
                intentConnection.setAction("com.example.readerandroidapp");
                intentConnection.putExtra("CONNECTION_STATUS", "Server ALIVE");
                sendBroadcast(intentConnection);
            }
        };
        this.wss.start();

        return localBinder;
    }

    public WebSocketServer getWss() {
        return wss;
    }

    public class LocalBinder extends Binder {
        public WebSocketService getInstance() {
            return WebSocketService.this;
        }
    }
}
