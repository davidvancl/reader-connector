package com.example.readerandroidapp;

import android.app.Activity;
import android.app.ActivityManager;
import android.content.Context;
import androidx.appcompat.app.AppCompatActivity;
import java.net.InetAddress;
import java.net.UnknownHostException;

public final class Utils {
    public static boolean isMyServiceRunning(Class<?> serviceClass, Activity activity) {
        ActivityManager manager = (ActivityManager) activity.getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (serviceClass.getName().equals(service.service.getClassName())) {
                return true;
            }
        }
        return false;
    }
}
