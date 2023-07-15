import {Theme} from "@/app/components/client/theme/themeSwicher";
import {Subject, map, delay} from "rxjs";

export class ThemeStore{
    private currentTheme: Theme = 'light';
    private readonly themeSubject: Subject<Theme> = new Subject<Theme>();

    updateTheme(theme: Theme){
        console.log('updating theme to: ' + theme);
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
