package com.github.mkstarter

import android.os.StrictMode

class DebugApplication : MainApplication() {

    override fun onCreate() {
        super.onCreate()

        // StrictMode の有効化
        StrictMode.ThreadPolicy.Builder()
            .detectAll()
            .penaltyFlashScreen()
            .penaltyLog()
            .build()
            .also { StrictMode.setThreadPolicy(it) }
    }
}
