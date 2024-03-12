declare module 'next/config' {
  type ConfigTypes = () => {
    basePath: string;
    // publicRuntimeConfig: {};
    // serverRuntimeConfig: {};
  };

  declare const getConfig: ConfigTypes;

  export default getConfig;
}
