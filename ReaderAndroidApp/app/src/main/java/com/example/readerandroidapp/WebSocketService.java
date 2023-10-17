package com.example.readerandroidapp;

import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.function.Function;

public class WebSocketService extends Service {
    ArrayList<WebSocket> clients = new ArrayList<>();
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
            // TODO: log
            System.out.println(e.getMessage());
        }

        this.clients.clear();
    }

    @Override
    public IBinder onBind(Intent intent) {
        this.wss = new WebSocketServer(new InetSocketAddress(Utils.getServerPort()), Runtime.getRuntime().availableProcessors(), null) {
            @Override
            public void onOpen(WebSocket conn, ClientHandshake handshake) {
                if (!clients.contains(conn)) {
                    clients.add(conn);
                    castDataToMainActivity((Intent localIntent) -> {
                        localIntent.putExtra("RENDER_CLIENTS", "TRUE");
                        return localIntent;
                    });
                }
            }

            @Override
            public void onClose(WebSocket conn, int code, String reason, boolean remote) {
                if (clients.contains(conn)) {
                    clients.remove(conn);
                    castDataToMainActivity((Intent localIntent) -> {
                        localIntent.putExtra("RENDER_CLIENTS", "TRUE");
                        return localIntent;
                    });
                }
            }

            @Override
            public void onMessage(WebSocket conn, String message) {
                castDataToMainActivity((Intent localIntent) -> {
                    localIntent.putExtra("CLIENT_MESSAGE", message);
                    return localIntent;
                });
            }

            @Override
            public void onError(WebSocket conn, Exception ex) {
                // TODO: log
            }

            @Override
            public void onStart() {
                castDataToMainActivity((Intent localIntent) -> {
                    localIntent.putExtra("CONNECTION_STATUS", "ALIVE");
                    return localIntent;
                });
            }
        };
        this.wss.start();
        return localBinder;
    }

    private void castDataToMainActivity(Function<Intent, Intent> assign) {
        Intent intentConnection = new Intent();
        intentConnection.setAction("com.example.readerandroidapp");
        intentConnection = assign.apply(intentConnection);
        sendBroadcast(intentConnection);
    }

    public WebSocketServer getWss() {
        return wss;
    }

    public ArrayList<WebSocket> getClients() {
        return this.clients;
    }

    public class LocalBinder extends Binder {
        public WebSocketService getInstance() {
            return WebSocketService.this;
        }
    }
}
