package com.shoutemapp;

import androidx.multidex.MultiDexApplication;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.shoutem.webview.ShoutemWebViewExtensionPackage;
import com.shoutem.social.ShoutemSocialExtensionPackage;
import com.shoutem.shopify.ShopifyPackage;
import com.shoutem.places.ShoutemPlacesExtensionPackage;
import com.shoutem.loyalty.ShoutemLoyaltyExtensionPackage;
import com.shoutem.icalevents.ShoutemIcalEventsExtensionPackage;
import com.shoutem.flurry.ShoutemFlurryExtensionPackage;
import com.shoutem.events.ShoutemEventsExtensionPackage;
import com.shoutem.cms.ShoutemCmsExtensionPackage;
import com.shoutem.camera.ShoutemCameraExtensionPackage;
import com.shoutem.auth.ShoutemAuthExtensionPackage;
import com.shoutem.audio.ShoutemAudioExtensionPackage;
import com.shoutem.application.ShoutemApplicationExtensionPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

import com.facebook.soloader.SoLoader;
//NativeModuleInjectionMark-mainApplication-import
import com.microsoft.codepush.react.CodePush;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.airbnb.android.react.maps.MapsPackage;

import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {
    //NativeModuleInjectionMark-mainApplication-body

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        //NativeModuleInjectionMark-mainApplication-rnhost-body
        
protected String getJSBundleFile() {
  return CodePush.getJSBundleFile();
}


        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          //NativeModuleInjectionMark-mainApplication-getPackages
          packages.add(new CodePush(null, getApplicationContext(), BuildConfig.DEBUG));
          packages.add(new FBSDKPackage());
          packages.add(new MapsPackage());

          return packages;
        }
    };

    protected String getJSMainModuleName() {
        return "index";
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        //NativeModuleInjectionMark-mainApplication-oncreate-end
    }
}
