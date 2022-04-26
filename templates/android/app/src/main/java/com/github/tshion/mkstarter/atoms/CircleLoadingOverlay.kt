package com.github.tshion.mkstarter.atoms

import android.content.Context
import android.util.AttributeSet
import android.view.View
import android.widget.FrameLayout
import com.github.tshion.mkstarter.R

/**
 * ローディング表示
 */
class CircleLoadingOverlay @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
) : FrameLayout(context, attrs) {

    init {
        View.inflate(context, R.layout.atoms_circle_loading_overlay, this)
        isClickable = true
        isFocusable = true
        setBackgroundResource(android.R.drawable.screen_background_dark_transparent)
    }
}
