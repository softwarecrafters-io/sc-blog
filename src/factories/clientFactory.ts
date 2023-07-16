import {ThemeStore} from "@/app/store/themeStore";

export class ClientFactory {
    private static themeStore: ThemeStore;

    static getThemeStore(): ThemeStore{
        if(this.themeStore == null){
            this.themeStore = new ThemeStore();
        }
        return this.themeStore;
    }
}
