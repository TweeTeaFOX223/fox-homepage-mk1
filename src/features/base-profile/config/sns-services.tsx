import { Twitter, Search, Github } from "lucide-react";
import { ServiceLink } from "../types/services";

export const serviceLinks: ServiceLink[] = [
  {
    name: "X",
    icon: <Twitter className="w-5 h-5" />,
    link: "https://x.com/TweeTea277",
  },
  {
    name: "Twilog",
    icon: <Search className="w-5 h-5" />,
    link: "https://twilog.togetter.com/TweeTea277",
  },
  {
    name: "GitHub",
    icon: <Github className="w-5 h-5" />,
    link: "https://github.com/TweeTeaFOX223",
  },
  {
    name: "Qiita",
    icon: (
      <div className="w-5 h-5 flex items-center justify-center font-bold">
        Qiita
      </div>
    ),
    link: "https://qiita.com/tweeteafox300",
  },
  {
    name: "Zenn",
    icon: (
      <div className="w-5 h-5 flex items-center justify-center font-bold">
        Zenn
      </div>
    ),
    link: "https://zenn.dev/tweeteafox300",
  },
  {
    name: "note",
    icon: (
      <div className="w-5 h-5 flex items-center justify-center font-bold">
        note
      </div>
    ),
    link: "https://note.com/tweeteafox300",
  },
];
