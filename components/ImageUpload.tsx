"use client";

import React from "react";
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from "@/lib/config";

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imageKit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { token, expire, signature } = data;

    return { token: token, expire: expire, signature: signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed :${error.message}`);
  }
};

const ImageUpload = () => {
  return <ImageKitProvider></ImageKitProvider>;
};

export default ImageUpload;
