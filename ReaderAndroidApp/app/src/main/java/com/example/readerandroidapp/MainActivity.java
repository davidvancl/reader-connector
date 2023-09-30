package com.example.readerandroidapp;

import androidx.appcompat.app.AppCompatActivity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.os.IBinder;
import android.text.format.Formatter;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    boolean mBounded;
    WebSocketService webSocketService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WifiManager wm = (WifiManager) getBaseContext().getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        String ip = Formatter.formatIpAddress(wm.getConnectionInfo().getIpAddress());
        ((TextView)findViewById(R.id.ipAddressTextView)).setText(ip);
    }

    public void onBroadcastClick(View v) {
        webSocketService.getWss().broadcast("HELLO WORLD");
    }

    public void onClickStartWebSocketServer(View v)
    {
        try {
            if (!Utils.isMyServiceRunning(WebSocketService.class, this)) {
                forceStartService();
            } else {
                forceStopService();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @Override
    protected void onDestroy() {
        if (Utils.isMyServiceRunning(WebSocketService.class, this)){
            forceStopService();
        }
        super.onDestroy();
    }

    private void forceStartService() {
        bindService(new Intent(this, WebSocketService.class), mConnection, BIND_AUTO_CREATE);
        startService(new Intent(this, WebSocketService.class));
    }
    private void forceStopService() {
        stopService(new Intent(MainActivity.this, WebSocketService.class));
        unbindService(mConnection);
        mBounded = false;
        webSocketService = null;
        ((TextView)findViewById(R.id.connectionStatusTextView)).setText("DISCONNECTED");
    }

    ServiceConnection mConnection = new ServiceConnection() {
        @Override
        public void onServiceDisconnected(ComponentName name) {
            mBounded = false;
            webSocketService = null;
            ((TextView)findViewById(R.id.connectionStatusTextView)).setText("DISCONNECTED");
        }

        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            mBounded = true;
            webSocketService = ((WebSocketService.LocalBinder) service).getInstance();
            ((TextView)findViewById(R.id.connectionStatusTextView)).setText("CONNECTED");
        }
    };
}