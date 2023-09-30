package com.example.readerandroidapp;

import androidx.appcompat.app.AppCompatActivity;

import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import android.text.format.Formatter;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        TextView ipAddressTextView = (TextView)findViewById(R.id.ipAddressTextView);

        Context context = getBaseContext().getApplicationContext();
        WifiManager wm = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);

        String ip = Formatter.formatIpAddress(wm.getConnectionInfo().getIpAddress());
        ipAddressTextView.setText(ip);
    }

    public void onClickStartWebSocketServer(View v)
    {
        if (!isMyServiceRunning(WebSocketService.class)) {
            startService(new Intent(MainActivity.this, WebSocketService.class));
        } else {
            stopService(new Intent(MainActivity.this, WebSocketService.class));
        }
    }

    private boolean isMyServiceRunning(Class<?> serviceClass) {
        ActivityManager manager = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (serviceClass.getName().equals(service.service.getClassName())) {
                return true;
            }
        }
        return false;
    }
}