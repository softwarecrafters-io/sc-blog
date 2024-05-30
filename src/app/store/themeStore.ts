import {Theme} from "@/app/components/server/header/theme/themeSwicher";
import {Subject, map, delay} from "rxjs";

export class ThemeStore{
    private currentTheme: Theme = 'dark';
    private readonly themeSubject: Subject<Theme> = new Subject<Theme>();

    updateTheme(theme: Theme){
        this.currentTheme = theme;
        this.themeSubject.next(theme);
    }

    getThemeSubject() {
        return this.themeSubject;
    }

    getCurrentTheme(): Theme{
        return this.currentTheme;
    }
}
