package com.example.readerandroidapp;

import android.app.ActivityManager;
import android.content.Context;
import androidx.appcompat.app.AppCompatActivity;

public final class Utils {
    public static boolean isMyServiceRunning(Class<?> serviceClass, AppCompatActivity activity) {
        ActivityManager manager = (ActivityManager) activity.getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (serviceClass.getName().equals(service.service.getClassName())) {
                return true;
            }
        }
        return false;
    }
}
