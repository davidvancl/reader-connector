package com.example.readerandroidapp;

import android.annotation.SuppressLint;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.ServiceConnection;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.os.IBinder;
import android.text.format.Formatter;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

public class MainActivity extends AppCompatActivity {
    boolean mBounded;
    WebSocketService webSocketService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WifiManager wm = (WifiManager) getBaseContext().getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        String ip = Formatter.formatIpAddress(wm.getConnectionInfo().getIpAddress());
        ((TextView) findViewById(R.id.textViewIpAddress)).setText(ip);
        ((TextView) findViewById(R.id.textViewPort)).setText(String.valueOf(8887));
    }

    @SuppressLint("UnspecifiedRegisterReceiverFlag")
    @Override
    protected void onStart() {
        super.onStart();
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction("com.example.readerandroidapp");
        registerReceiver(broadcastReceiver, intentFilter);
    }

    @Override
    protected void onStop() {
        super.onStop();
        unregisterReceiver(broadcastReceiver);
    }

    public void onBroadcastClick(View v) {
        if (webSocketService != null) {
            webSocketService.getWss().broadcast("HELLO WORLD");
        }
    }

    public void onScanOpenClick(View v) {
        startActivity(new Intent(this, CustomCaptureActivity.class));
    }

    public void onClickStartWebSocketServer(View v) {
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
        if (Utils.isMyServiceRunning(WebSocketService.class, this)) {
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
        setStatusVisualisation(false);
    }

    ServiceConnection mConnection = new ServiceConnection() {
        @Override
        public void onServiceDisconnected(ComponentName name) {
            mBounded = false;
            webSocketService = null;
            setStatusVisualisation(false);
        }

        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            mBounded = true;
            webSocketService = ((WebSocketService.LocalBinder) service).getInstance();
        }
    };

    BroadcastReceiver broadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            setStatusVisualisation(true);
        }
    };

    private void setStatusVisualisation(boolean success) {
        FloatingActionButton status = findViewById(R.id.buttonServerStatus);
        Button serverAction = findViewById(R.id.buttonServerManipulation);

        if (success) {
            serverAction.setText(R.string.button_text_server_stop);
            serverAction.setBackgroundResource(R.color.admin_danger);
            status.setImageResource(R.drawable.success_icon);
            status.setImageTintList(getResources().getColorStateList(R.color.admin_success, null));
        } else {
            serverAction.setText(R.string.button_text_server_start);
            serverAction.setBackgroundResource(R.color.admin_success);
            status.setImageResource(R.drawable.error_icon);
            status.setImageTintList(getResources().getColorStateList(R.color.admin_danger, null));
        }
    }
}