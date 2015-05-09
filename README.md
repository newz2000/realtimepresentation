# Iowa Code Camp Presentation
This is the source code and presentation from my Iowa Code Camp presentation, May 2015.

The title of this presentation is:
Beyond REST: Realtime apps with Node.js and websockets

The source code may be used for your reference or as the foundation to new 
projects under the Apache 2.0 license (included in [LICENSE.md](LICENSE.md)).

This README file, which contains the transcript of my presentation, as well as
the text of [/views/partials/slides.hbs](views/partials/slides.hbs) is 
&copy; Copyright Matthew Nuzum 2015. It may be distributed or shared according
to the cc-by 2.0 license.

## Transcript
Hi, my name is Matt Nuzum and today we’re going to talk about the real-time web. In particular, we’ll be discussing how to implement real-time apps with Node.js and websockets, though the information we’ll cover is generally applicable to other environments.
<slide>

The exciting news is that this is a technology you can use today. And by “today” I mean you can use it right now. If you open this website on your computer, phone or tablet, you can follow along with me and see the real-time web in action. Visit tekrs.com/real-time. You’ll see the slides advance as we proceed, which will be handy for the code samples, and you’ll also see the total number of people viewing the presentation update in real time. In the top right  you can see this Questions link. Click the show button to see questions. You can add your own and you can upvote questions you’d like an answer to. You’ll see all of this happen in real time.
<slide>

So what is real time? That’s a hard question to answer. Generally, in engineering, you have a predictable, near zero latency between when an event happens and when it is processed. If you’re following along you’ll notice the slides change at pretty much the exact time I change them. However, I think it’s easier to understand what real-time means if we look at some of the problems it solves. So let’s take a brief trip back in time.
<slide>

Here you see an image that is near and dear to my heart. You see, I made this web site. Back in July 2006, I took a job as the webmaster for Ubuntu.com. It was a lot of fun, and as time passed, the fun only continued. Then came the first real big test of my skills. The Ubuntu 6.10 release, the first release with me as the Ubuntu webmaster.
Sadly, I botched it horribly. You see, I was really naive about what it means to run a busy website. I misunderstood my instructions. What I thought someone told me was that, since I was in a western time zone, I should just wait until the end of the night and then update the website before I go to bed. I’m somewhat of a night owl, so I got the site ready and then about midnight, updated the website, checked to see that it worked, and then went to bed.
The next morning I got an earful. A big earful. I just didn’t realize how big of a deal an Ubuntu release was. Apparently, hundreds of thousands of people sit on the home page and refresh constantly waiting for the change to be announced. Then, when the website changes there’s a mad rush of people who go to download the new version. I kid you not, there are so many people waiting that they fill up an entire IRC chat room until it overflows into another and another. Sometimes there are five chat rooms full of people waiting.
Now picture in mind your mind a hundred thousand people refreshing the page over and over so that they can know the moment it changes.
THAT is the problem we are trying to solve with the real-time web.
<slide>

This problem has been wanting a solution for some time. Let’s go back in time to 1999. ¿Does anyone here recognize this screen? This is the admin area for the massively popular Cobalt Raq webserver. It really turned the web hosting industry upside down. These were small cheap servers that could each host hundreds of websites. And even better, they had an amazingly easy to use interface. Hosting companies big and small could add users and let them manage their own website.
One cool feature that made it stand out from anything I’d ever seen before was that it had a real time status display in the bottom left corner. Down here is a dot that looks kind of like an LED. If anything noteworthy were happening on the server, it would change colors.
“How did it do that?” you might ask. This site was built to work in Netscape 3.0 IE 3.0 or later. These browsers supported both Javascript and frames. So this page was actually a series of frames, and there was a javascript controller that would refresh the frame in the bottom left corner. Every 30 seconds or so, that little LED frame would refresh. In essence, it was no different than the hordes of people refreshing the Ubuntu home page. It was just automated.
But it worked. The usability and convenience of this feature made a huge impact on the market. It was one of the cases where we saw the commercial impact of the real time web.
<slide>

That same year, something new happened. Microsoft changed the web with the release of IE5. They invented Ajax. We didn’t call it that, we called it DHTML and later “Web 2.0,” but IE5 included a feature called iXMLHTTPRequest, which was a precursor to XMLHTTPRequest which we use today. I noticed it for the first time on the MSDN website. Everyone was trying to figure out how to make an “Explorer” like file-view display with expanding folders. The most common ways were to use a frame, like on the cobalt website. The whole frame would refresh when you expanded a folder. I noticed that they had created a better way and there were no frames. I had, and still have, a deep aversion to XML so I didn’t dig in too deep, but I thought it was awesome.
By about 2006 (yes, seriously) all the popular browsers had this capability. The real-time web was catching on. The way it worked is that, instead of refreshing the whole page, an Ajax request would fire every so often and get new information from the server. It was still polling, but it was better. No pages refreshed and only small amounts of data had to be transferred.
<slide>

People wanted more. They wanted server push. They wanted real real time. There were some clever hacks created, such as Cometd, Long polling and tricky Flash techniques. The real time web arrived. Using these techniques the server could send information to the client and it would show up in milliseconds.
These techniques had their downside. They hurt battery life on mobile and in some cases they caused the page to never stop loading completely.
But really, these techniques were just paving the way for
<slide>

Websockets. The real time web done right.
<slide>

WebSockets is an internet standard. This is RFC 6455 and was standardized by IETF in 2011. That means there are several implementations. The first time I saw it was a demo of the SignalR technology, which is a .Net application. There are many implementations of the server protocol, such as Java, Python and .Net. There are also client implementations in many languages such as Android, iOS Objective C and of course many browsers support it via Javascript. This is not an exhaustive list, so if you don’t see your favorite language, do some looking.
<slide>

That brings us to the question everyone’s asking: Can I use it in my project today? Well, if you focus on evergreen browsers, yes. But do note these red blocks here. These are important to some people. If you care about older IEs, which don’t support the WebSocket standards, then the answer is a big…
<slide>

Yes, you can. If you use Socket.io. Socket.io is a real-time engine that uses websockets when possible, and then falls back to older technologies on browsers that don’t support it. You’re going to love the browser support…
<slide>

It supports IE back to 5.5, which I hope nobody here is using. Safari 3, Chrome, Firefox 3 and pretty much any browser that can reasonablly be considered modern.
You don’t have to wait to use Websockets.
<slide>

So now you know you can use it, what should you use it for? My goal is to eliminate polling. Here are some possibilities:
<slide>

Everyone’s first app is a chat app. Admit it, you were thinking about it, right?
But let’s get more creative.
<slide>

How about updating product availability in real time? Imagine if you were on Woot and you saw that there were only 1000 smart toasters left, and the number was dropping fast. In real time.
<slide>

How about stock or commodities pricing? If you think about it, some stocks don’t change their price at all during a day. Some change quickly. You can see the numbers change instantly when a stock updates. And only the data for the stock you’re using would get sent over the wire.
¿What other kinds of apps would you use websockets for?
<slide>

So let’s put these web sockets to work. I’ve got good news for you, it’s actually pretty easy.
<slide>

The thing to remember is that everything is an event. Notice here in this code, we have the socket.on function call. That’s essentially listening for the server to send an event over the socket called “questions”. This is a trimmed version of the code we’re using now in this slide show. When a set of questions is sent through, it updates the question count and the display of questions.
If you ask a question, this sendQuestion code gets called. There’s no magic here, we simply get the question field, then emit an event on the socket. The event is called question, which is singular. We pass along the value of the question to the server.
<slide>

On the server we have a listener that waits for a question event. When it happens, it adds the question to the list and then emits the questions event with the list of questions. Notice that we’re listening on socket but in this case we emit on io. io.emit is a shorthand that broadcasts to all sockets. I could also just emit on one socket, if I only wanted one client to get the event.
<socket>

I built the entire slide show app in about 3 hours. At the end of the presentation I’ll show you where you can download the code.
<slide>

So how does Socket.io work? First it makes an HTTP request using ajax to figure out the best protocol to use. If your browser and server both support websockets then it’ll use that. Otherwise it will fall back to one of the older technologies like long polling.
One it knows what protocol to use it will establish a connection, which is a handshake very similar to an HTTP connection. Then it begins two-way communication. Socket.io also adds cod to reestablish a connection if it breaks. As a developer, it’s all magic, and it just works seamlessly.
<slide>

On the server side, as you saw, you can broadcast to all connections. You can also keep track of individual connections. One way to do that is to use sessions on the server side. As a matter of fact, if a user logs in you can access that authentication info in the session to look up details about their user role.
<slide>

If you’re using socket.io you’re probably using Node.js. You can add it to an Express.js application, which is what I’ve done here in this app. It’s pretty easy, but it does require you to change the way you initialize your application slightly.
You need Express, like usual, but you also need the http module and socket.io. Then, after you make your app you create a server instance from it using http.server. This is usually done by Express for you, but we actually need to access the server variable, which is a private variable under normal circumstances. Then you use that server variable to add socket.io to the app.
At the end of your file, you’ll use server.listen to start your server.
<slide>

Here’s some of the code we’re using on the slideshow app. We start the app with zero connections, then we listen for new connections. When that happens, we increment our count and then emit an event with the new value. That’s why you can see the number in the top corner change in real time.
When a disconnect event is fired, we decrease the connection count and then emit an updated value.
Piece of cake.
<slide>

So that brings us to REST. What is it good for? Well, a lot. It’s built on HTTP. This is an important distinction. Websockets are a different protocol, they’re not HTTP, though they’re meant to work harmoniously with it. REST is stateless, as HTTP should be. Therefore it’s great for APIs. It’s far simpler than SOAP, CORBA and many of the previous generations of APIs. 
REST is used heavily in CRUD style web apps. Is HTTP and REST the best choice for these types of apps? I don’t think so.
<slide>

Here’s how a modern web app works. The server figures out who you are and what you’re allowed to see or do. It then fetches the information and sends it to the browser where it is displayed, maybe in an edit form. It’s then submitted back to the server, but due to the statelessness, the server has to figure out who you are again. It doesn’t matter if you’re clicking around to new pages or using Ajax, the statelessness of the web is causing a lot of work to happen behind the scenes.
<slide>

This makes me wonder when statelessness is a benefit. I can think of one case where it’s hugely beneficial: Scaling apps. If you do the stateless thing right, you can easily scale up your apps by adding servers.
<slide>

It won’t be long after you build your first Node.js app that you start to wonder how you scale it. This is true for standard HTTP apps and Socket.io apps.
<slide>

Here’s a picture that shows you a real problem you’ll experience with Node.js.
¿Do you see the issue?
This server has four cores. One is pegged at 100% utilization but the other three are taking a nap. This server isn’t busy, but whatever process is using that first CPU core thinks it is.
<slide>

If my server is going to be busy, then I want it to look like this. I want it to be maxed out. Now this is busy.
<slide>

This is a real problem because Node.js isn’t really multithreaded. This is a slight oversimplification, but true for most practical purposes. Therefore if you’re running Node.js, it is free to use 100% of one CPU core but won’t utilize all the cores in your server.
<slide>

To solve that problem, we run multiple instances of our Node app. In the case of a six core server, it might look like this. Here we have four Node.js processes running. We have an HTTP worker process such as Nginx, Apache or IIS handling static assets and balancing the requests to the four node.js processes, and then we have one core for OS and other stuff. I’ll be honest, if it were me, I’d probably be running five Node.js processes.
<slide>

But now we have a new problem. Anyone here played this game before, where you fix one and then a new one shows up? Well, our new problem isn’t an issue for all apps, but it will be if you’re using websockets. Remember how we would do io.emit to send an event to all clients? Well, if you have four Node.js processes, there is no single pool of all the sockets. We’d have to do an io.emit() four times to get them all. That means you need some way for all four processes to know that they need to do the io.emit().
<slide>

There are a couple ways to solve this problem. We could poll the database for changes. But seriously, we’re not doing that. Some projects pool all of their sockets to one server. I don’t like this solution, because it’s simply delaying the inevitable. I’d prefer to scale out than scale up.
In my opinion, the best way to solve this is with a message queue.
<slide>

My new favorite is Redis. What’s that? You say that Redis isn’t a message queue, it’s a key/value store, like memcached? Well, you’re right. It’s just like memcached, and as a matter of fact, until recently I always used memcached. People were telling me that Redis is awesome for session support, but so is memcached, so I just ignored it.
But recently, Redis added pub/sub support. This gives it the capabilities of a simple message queue. It works a lot like websockets. You simply listen to events.
<slide>

Here’s how it works. You need two clients, in most cases. A client is generic at first. It can be a publisher and a subscriber. But the first time you publish on it, it can no longer be a subscriber. So you make two, and one is for subscribing and one is for publishing.
Instead of emit you publish events. In this case, we publish an instances event and the message is “start”. We do that on the first client. Then we set the second client up to listen to the message event. When it happens, we doStuff(); One of the things we could do is emit an event to the socket.io. For example, every time a socket connection is made, we could update a shared list of connections and then broadcast the change, then emit the total connections to our sockets. The other node.js processes would then get the news about the update and emit the same to their own connections.
By the way, this technique can scale to multiple processes on one server or multiple servers.
<slide>

OK, that’s the meat of the presentation, let’s take questions.
<slide>

Before you go, I want to take a moment to tell you about my new endeaver. My business TEKRS is working to bring affordable tech training to the midwest. I’m teaching on topics such as Node.js, learning HTML and building professional web apps. I do this through in-person seminars and online training. I have a very low-volume mailing list you can sign up for if you’d like to receive advance notice and discounts for upcoming training events.

I hope you enjoyed this. Please check out the code on Github for examples on how you can put this to work for yourself.

