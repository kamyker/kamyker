import ProjectCard from "./ProjectCard";
import drumAwardsBanner from "@/assets/drum-awards-banner.png";
import secretRvbLobby from "@/assets/secret-rvb-lobby.jpeg";
import uefnOptimization from "/images/uefn-optimization.jpg";

const projects = [{
    title: "Money Tycoon",
    description: "🏆 Bronze Winner - The Drum Marketing Awards EMEA 2025 (Metaverse). First metaverse campaign by a Polish bank (Bank Pekao S.A.). A financial simulator with 90,000+ plays where players build businesses and create their own bank.",
    image: "https://cdn-0001.qstv.on.epicgames.com/dhhrVLXpRImiPtpJKy/image/landscape_comp_s.jpeg",
    embeddedVideoUrl: "https://a.storyblok.com/f/231265/x/a08cc525c4/wejdz-do-swiata-fortnite-z-zubrem.mp4",
    tags: ["UEFN", "Fortnite", "Verse", "Bank Pekao S.A.", "Award Winner"],
    demoUrl: "https://www.fortnite.com/@fnbl0/8754-6289-4338",
    featured: true,
    awardBadge: {
        image: drumAwardsBanner,
        alt: "The Drum Awards - Marketing EMEA 2025 Bronze Winner",
        url: "https://www.thedrummarketingawards.com/emea/en/page/results#/dma-emea/2025/metaverse/how-bank-pekao-s-a-became-sigma"
    }
}, {
    title: "Paint And Seek",
    description: "A paint-and-seek map where players paint freely in-world with a custom brush system with sophisticated painting system in UEFN Scene Graph. Paint yourself any way you want, blend into the environment, and hide as tiny characters.",
    image: "/images/uefn-painting-system.jpg",
    embeddedVideoUrl: "/videos/uefn-painting-system.mp4",
    tags: ["UEFN", "Fortnite", "Verse", "Scene Graph", "Painting"],
    demoUrl: "https://fortnite.gg/island/6031-2794-1295",
    featured: true
}, {
    title: "Drip Shop Tycoon - Reporter Young",
    description: "A branded tycoon experience for Reporter Young clothing brand with over 700,000 plays. Players build and manage their own clothing shop, expanding their fashion empire in Fortnite.",
    image: "https://cdn-0001.qstv.on.epicgames.com/dhhrVLXpRImiPtpJKy/image/landscape_comp_s.jpeg",
    embeddedVideoUrl: "https://a.storyblok.com/f/231265/x/2b2807db47/logadodanerp-1.mp4",
    tags: ["UEFN", "Fortnite", "Verse", "Reporter Young"],
    demoUrl: "https://fortnite.gg/island?code=9441-8610-2332",
    featured: true
}, {
    title: "Beat Aim",
    description: "An innovative aim trainer where targets are generated based on music rhythm. A Unity/C# game available on Steam.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
    tags: ["Unity", "C#", "Steam", "Music", "Aim Trainer"],
    demoUrl: "https://beataim.com",
    videoUrl: "https://www.youtube.com/c/BeatAim",
    youtubeVideoId: "_2UX9ymzGzM"
}, {
    title: "Neighbor Boss Fight",
    description: "A boss fight map where players battle a dragon in a Tokyo city environment. Created for [NEIGHBOR_FN](https://x.com/NEIGHBOR_FN).",
    image: "/videos/neighbor-boss-fight.mp4",
    tags: ["UEFN", "Fortnite", "Boss Fight", "Dragon"],
    embeddedVideoUrl: "/videos/neighbor-boss-fight.mp4"
}];
const pastCommissions = [{
    title: "KubxFN's Mega Optimization",
    description: `Commission to optimize @KubxFN's UEFN map:
• Memory: 81k → 67k
• Actor count: 13k → 10k
• Project download size: -40%
• Fixed crashes on Switch
• Map was locked on Switch - fixed
• Optimized Verse loops
Map hit homebar after optimizations! 🎉`,
    image: uefnOptimization,
    tags: ["UEFN", "Optimization", "Commission", "Performance"],
    demoUrl: "https://x.com/kamyker/status/1997449569156890729"
}, {
    title: "Secret RvB for ChitaZ",
    description: `Commission to optimize @ChitaZ's UEFN map:
• Download size: 53mb → 47mb
• Memory: 88k → 71k
• Fixed memory leaks in 4 Verse scripts
• Optimized main floor rendering`,
    image: secretRvbLobby,
    tags: ["UEFN", "Optimization", "Commission", "Performance"]
}, {
    title: "ULTRA 1V1 ALL GUNS",
    description: `Commission to optimize UEFN map:
• Project download size: -30%
• Removed 5400 actors
• Memory: -8%
• Fixed 8 Verse memory leaks
• Optimized many Verse loops`,
    image: "https://cdn-0001.qstv.on.epicgames.com/iskkhxfhUWnkTsJjfu/image/landscape_comp.jpeg",
    tags: ["UEFN", "Optimization", "Commission", "Performance"]
}, {
    title: "STEAL THE BRAINROT",
    description: `Commission to optimize Ferin's map project size:
• Project download size: -40mb
• Memory: -4k`,
    image: "https://cdn-0001.qstv.on.epicgames.com/UadMAVPfUxYtvICMRP/image/landscape_comp.jpeg",
    tags: ["UEFN", "Optimization", "Commission", "Performance"],
    demoUrl: "https://fortnite.gg/island?code=3225-0366-8885"
}, {
    title: "CRAZY 1V1 FFA",
    description: `Commission to optimize lag for Hozzy's map that made the game unplayable in longer sessions:
• Fixed over 20 (!) Verse memory leaks
• Various performance fixes related to Verse and assets
• Slight memory and project size improvements

This was done in mid-December, map got into homebar at the end of the month with a new record of 51k CCU!`,
    image: "/images/crazy-1v1-ffa.png",
    tags: ["UEFN", "Optimization", "Commission", "Performance"]
}];

const optimizedMaps = [{
    title: "Memes Vs Brainrots",
    image: "https://cdn-0001.qstv.on.epicgames.com/XEtSHffusKlKOlVVKc/image/landscape_comp.jpeg",
    url: "https://fortnite.gg/island/9810-2147-6885"
}, {
    title: "Fort Lock: Soccer/Football",
    image: "https://cdn-0001.qstv.on.epicgames.com/PGFTUSudaXwGYSQQtL/image/landscape_comp.jpeg",
    url: "https://fortnite.gg/island/1652-7714-7390"
}, {
    title: "SECRET RED VS BLUE",
    image: "https://cdn-0001.qstv.on.epicgames.com/DcgSrTAZZOFRCkEmLT/image/landscape_comp.jpeg",
    url: "https://fortnite.gg/island/2679-7442-3940"
}, {
    title: "Mr. Pickle 2 Fall Guys",
    image: "/images/mr-pickle-student-run.jpeg",
    url: "https://fortnite.gg/island/1683-6205-8518"
}, {
    title: "BEST 1V1",
    image: "https://cdn-0001.qstv.on.epicgames.com/sZBRsFuhRYkxBCVGWf/image/landscape_comp.jpeg",
    url: "https://fortnite.gg/island/8880-2011-6281"
}];

const Projects = () =>
{
    return <section id="projects" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
        {/* Background glow effects */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                    <span className="text-gradient glow-text">Featured</span> Projects
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Award-winning brand experiences, tycoon maps, and rhythm-based gaming</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {projects.map(project => <ProjectCard key={project.title} {...project} />)}
            </div>
        </div>

        {/* Past Commissions Section */}
        <div id="commissions" className="container mx-auto px-6 relative z-10 mt-24">
            <div className="text-center mb-16">
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                    <span className="text-gradient glow-text">Past</span> Commissions
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Professional optimization and development work for clients
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {pastCommissions.map(project => <ProjectCard key={project.title} {...project} />)}
            </div>

            <div className="mt-24">
                <div className="text-center mb-12">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient glow-text">Optimized</span> Maps
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
                    {optimizedMaps.map(map => (
                        <a
                            key={map.url}
                            href={map.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block aspect-video overflow-hidden rounded-xl border border-secondary/30 bg-gradient-card transition-all duration-500 hover:border-primary/60 hover:shadow-neon"
                        >
                            <img
                                src={map.image}
                                alt={map.title}
                                onError={event => {
                                    event.currentTarget.style.display = "none";
                                }}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-card/10 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                                    {map.title}
                                </h3>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </section>;
};
export default Projects;
