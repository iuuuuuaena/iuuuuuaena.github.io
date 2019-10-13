# 作业 5  #

## 111172   Tom ##

基于Java的多态性实现一个模拟的播放器插件程序 

> 参考文献 李延春，软件插件技术的原理与实现，《计算机系统应用》，2003

**提示:**
   > 1.宿主程序实现:可基于 Java AWT 框架搭建软件界面，由 AAPlayer、AAPFrame、AboutBox 三个 Java 类构成，AAPlayer 是整个程序的主类，负责构建 AAPFrame 类的实例，进行基本 的配置等。AAPFrame 类负责初始化音频播放器界面，选择加载音频播放插件，为相关按 钮添加事件，控制音频的播放等操作。AboutBox 用来介绍软件信息; 
2.插件实现:模拟音频播放器的播放插件都是基于接口 IPlayerPlugin 实现的，包括 MP3PlayerPlugin、WAVPlayerPlugin、OGGPlayerPlugin 等，用户还可以根据自己的需求，去 扩展不同文件格式的播放插件。 
【题目思想】

>2.按照要求，需要创建三个类，AAPlayer、AAPFrame、AboutBox，AAPlayer的作用是初始化AAPFrame，并且动态实现切换插件，动态实现类，AAPFrame的作用是，初始化播放器页面，AboutBox的作用是实现这个模拟程序的说明窗口。
这个模拟播放器由两个窗口组成，一个是主窗口
                    
>3.另一个是说明窗口
            
>4.左上角有menubar菜单栏，可以实现切换插件，打开应用简介等功能

>5.可以实现，点击插件，切换到对应的插件模式的功能

*【核心思想&代码】*

>1.核心思想是插件的使用，需要自己制作jar包，利用java 的反射机制。我建了一个_plugin_包，里面声明了三个插件的class，


>2. 他们继承了我的api——IPlayerGlugin，我需要声明他们，然后使用idea的导出jar包的工具 

>> (注意导出流程，参考https://www.cnblogs.com/prettrywork/p/10950055.html)

>3.之后用Build Artifacts编译一下
   
>4.就可以在out/artifacts/目录下，找到我们的三个jar包了

>5.之后，我们需要实现动态调用jar包的代码

>6.通过点击菜单栏的三个插件栏，就可以在actListenerEvent事件中，调用相应的jar包，实现相应jar包所包含的功能了

>7.最后可以实现在三个插件之间来回切换

***【总结】***
*此次作业的目的是了解jar包的制作过程，以及插件的使用，希望可以对学习有所帮助*
