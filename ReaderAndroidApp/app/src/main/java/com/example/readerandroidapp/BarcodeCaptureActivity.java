package com.example.readerandroidapp;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.graphics.Color;
import android.os.Bundle;
import android.os.IBinder;
import android.view.KeyEvent;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.ResultPoint;
import com.google.zxing.client.android.BeepManager;
import com.journeyapps.barcodescanner.BarcodeCallback;
import com.journeyapps.barcodescanner.BarcodeResult;
import com.journeyapps.barcodescanner.CaptureActivity;
import com.journeyapps.barcodescanner.DecoratedBarcodeView;
import com.journeyapps.barcodescanner.DefaultDecoderFactory;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class BarcodeCaptureActivity extends CaptureActivity {
    private DecoratedBarcodeView barcodeView;
    private BeepManager beepManager;
    private String lastText;
    boolean mBounded;
    boolean scannerPaused = false;
    WebSocketService webSocketService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.custom_capture_activity);

        barcodeView = findViewById(R.id.barcode_scanner);
        Collection<BarcodeFormat> formats = Arrays.asList(
                BarcodeFormat.QR_CODE,
                BarcodeFormat.CODE_128,
                BarcodeFormat.EAN_13,
                BarcodeFormat.EAN_8
        );
        barcodeView.getBarcodeView().setDecoderFactory(new DefaultDecoderFactory(formats));
        barcodeView.initializeFromIntent(getIntent());
        barcodeView.decodeContinuous(callback);
        beepManager = new BeepManager(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        barcodeView.resume();
        updateButtonToState(false);
        if (Utils.isMyServiceRunning(WebSocketService.class, this)) {
            bindService(new Intent(this, WebSocketService.class), mConnection, Context.BIND_AUTO_CREATE);
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        barcodeView.pause();
        updateButtonToState(true);
        if (Utils.isMyServiceRunning(WebSocketService.class, this)) {
            unbindService(mConnection);
        }
    }

    public void onPauseOrResumeClick(View v) {
        if (!scannerPaused) {
            updateButtonToState(true);
            barcodeView.pause();
        } else {
            updateButtonToState(false);
            barcodeView.resume();
        }
    }

    private void updateButtonToState(boolean stopped) {
        Button actionButton = findViewById(R.id.startPauseButton);

        if (stopped) {
            actionButton.setText(R.string.button_text_server_start);
            actionButton.setBackgroundResource(R.color.admin_success);
            scannerPaused = true;
        } else {
            actionButton.setText(R.string.button_text_server_stop);
            actionButton.setBackgroundResource(R.color.admin_danger);
            scannerPaused = false;
        }
    }

    public void onReturnClick(View v) {
        finish();
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        return barcodeView.onKeyDown(keyCode, event) || super.onKeyDown(keyCode, event);
    }

    private final BarcodeCallback callback = new BarcodeCallback() {
        @Override
        public void barcodeResult(BarcodeResult result) {
            if (result.getText() == null || result.getText().equals(lastText)) {
                return;
            }

            lastText = result.getText();

            if (webSocketService != null) {
                webSocketService.getWss().broadcast(lastText);
            }

            barcodeView.setStatusText(result.getText());
            beepManager.playBeepSoundAndVibrate();

            ImageView imageView = findViewById(R.id.barcodePreview);
            imageView.setImageBitmap(result.getBitmapWithResultPoints(Color.YELLOW));
        }

        @Override
        public void possibleResultPoints(List<ResultPoint> resultPoints) {
        }
    };

    ServiceConnection mConnection = new ServiceConnection() {
        @Override
        public void onServiceDisconnected(ComponentName name) {
            mBounded = false;
            webSocketService = null;
        }

        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            mBounded = true;
            webSocketService = ((WebSocketService.LocalBinder) service).getInstance();
        }
    };
}
