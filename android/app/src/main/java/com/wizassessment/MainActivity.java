package com.wizassessment;

import android.os.Bundle;

import com.facebook.react.ReactActivity;


import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "WizAssessment";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setTheme(R.style.AppTheme);
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }
}
