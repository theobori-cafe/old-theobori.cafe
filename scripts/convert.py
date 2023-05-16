#!/usr/bin/env python

"""convert module"""

import re
import os
from uuid import uuid4

from md2gemini import md2gemini
from typing import Any
from enum import Enum
from sys import argv, stderr, stdout

class Document(Enum):
    """
        Every available document formats
        
        Keys are link to the documents extensions
    """
    
    GEMINI = "gmi"
    GOPHER = "gph"

METADATA_REGEXS = {  
    "title": (
        re.compile(rf"(title):\s+(.+)\n"),
        str
    ),
    "description": (
        re.compile(rf"(description):\s+(.+)\n"),
        str
    ),
    "updated_at": (
        re.compile(rf"(updatedAt):\s+(.+)\n"),
        str
    ),
    "categories": (
        re.compile(rf"(categories):\s+\[(.+)\]", re.DOTALL),
        list
    ),
    "author": (
        re.compile(rf"(author):\s+(.+)\n"),
        str
    )
}

AVAILABLES_LANG = (
    "tsx",
    "jsx",
    "typescript",
    "scss",
    "bash",
    "markdown",
    "json",
    "rust",
    "asm6502",
    "docker",
    "python"
)

BLOCK_RE = "```%s[\\s\S]*?```"
ALL_BLOCKS = BLOCK_RE % ("[" + "|".join(AVAILABLES_LANG) + "]")

class PostMetadata:
    """
        Store the post metadata like title,
        description, etc...
    """

    def __init__(self, data: str = None):
        # Data to parse
        self.src = data
        
    def parse(self):
        """
            Parse `self.src`
            
            It must have the same header than posts
            in `content/posts/`
        """
        
        if not self.src:
            return

        for k, (regex, _type) in METADATA_REGEXS.items():
            match = re.findall(regex, self.src).pop()
        
            if len(match) != 2:
                continue
    
            (_, value) = match
            
            value = value.replace("\n", "")

            match _type.__name__:
                case "list":
                    value = "[" + value + "]"
                    
                    self.__setattr__(k, eval(value))
                case "str":
                    value = value.replace("\"", "")
                    self.__setattr__(k, value)
                case _:
                    raise Exception("Invalid metadata type")
        
class PostConvert:
    """
        Abstract class to convert a post
        from `content/posts/` to another
        document format
    """
    
    def __init__(self, document: Document):
        self.document = document
        self.data = None
        self._f = stdout
        self._metadata = PostMetadata()
        
    def set_f(self, f=stdout):
        """
            Change the file descriptor
        """
        
        self._f = f
    
    def print(self, *args, **kwargs):
        """
            Wrapping the print function to use
            `self._f` as the default file descriptor
        """
        
        print(*args, **kwargs, file=self._f)
    
    def __pre_parse(self, data: str=None) -> bool:
        """
            Parse the post
            
            Split the header and the main content
        """
        
        if not data:
            return False

        data = data.split("---")
        data = list(
            filter(
                lambda x: x != "",
                data
            )
        )
        
        if len(data) != 2:
            return False
        
        self.data = data.pop()
        self._metadata.src = data.pop()
        
        return True
    
    def load(self, data: str):
        """
            Load data
        """
        
        if not self.__pre_parse(data):
            raise Exception("Unable to parse this data")
    
    def load_from_file(self, filepath: str):
        """
            Set data from a file
        """
        
        with open(filepath, "r") as f:
            self.load(f.read())
    
    def parse(self):
        """
            Parse
        """
        
        self._metadata.parse()
    
    def _metadata_dump(self):
        """
            Dump the metadata aka the header
        """
        
        raise Exception("Not implemented !")

    def dump(self):
        """
            Dump the entire document into the given format
        """

        raise Exception("Not implemented !")
    
    def parse_and_dump(self):
        """
            Parse then dump
        """
        
        self.parse()
        self.dump()

class GeminiConvert(PostConvert):
    """
        Convert into the gemini format
    """
    
    HTML_RE = re.compile(rf"{BLOCK_RE}" % "html")
    
    def __init__(self):
        super().__init__(Document.GEMINI)
        
        self.dest = ""
        
    def parse(self):
        super().parse()
        
        self.dest = md2gemini(self.data)

        html_blocks = re.findall(
            GeminiConvert.HTML_RE,
            str(self.dest)
        )

        for block in html_blocks:
            self.dest = self.dest.replace(block, "")

        tmp = str(uuid4())
        self.dest = self.dest.replace("```", tmp)
        self.dest = self.dest.replace("`", "")
        self.dest = self.dest.replace(tmp, "```")

    def _metadata_dump(self):
        self.print("# " + self._metadata.title)
        self.print("## " + self._metadata.description)
        self.print("### ", " - ".join(self._metadata.categories))
        self.print(
            "By " + self._metadata.author + 
            ", edited " + self._metadata.updated_at
        )
    
    def dump(self):
        self._metadata_dump()
        self.print(self.dest)

class GopherConvert(PostConvert):
    """
        Convert into the gopher format
    """
    
    HTTP_SOURCE_RE = re.compile(
        rf"(\[.+\])(\(https:\/\/.+?\))",
    )
    P_RE = r"<p .+?>.+?<\/p>"
    DEFAULT_HOSTPAGE = "tilde.pink"
    DEFAULT_PORT = 70
    
    def __init__(self):
        super().__init__(Document.GOPHER)
        
        self.dest = ""
    
    def http_menu(
        title: str,
        url: str,
        hostpage: str=DEFAULT_HOSTPAGE,
        port: int=DEFAULT_PORT
    ) -> str:
        """
            Generate an HTTP menu
        """
        
        return "[h|" + title + "|" + "URL:" + \
            url + "|" + hostpage + "|" + \
            str(port) + "]"
    
    def __process_redirects(self):
        """
            Replace the redirects markdown tags
            in the gopher way
        """
        
        redirects = re.findall(
            GopherConvert.HTTP_SOURCE_RE,
            self.dest
        )
        
        for title, url in redirects:
            title_dest = title.replace("*", "")[1:-1]
            url_dest = url[1:-1]
            
            http_menu = GopherConvert.http_menu(
                title_dest,
                url_dest
            )
            
            redirect = title + url
            self.dest = self.dest.replace(
                redirect,
                "\n" + http_menu + "\n"
            )
    
    def __process_p_tags(self):
        """
            Replace the HTML <p></p>
        """
        
        matchs = re.findall(
            GopherConvert.P_RE,
            self.dest,
            re.MULTILINE | re.DOTALL
        )
        
        for match in matchs:
            self.dest = self.dest.replace(
                match,
                ""
            )         
        
    def parse(self):
        super().parse()
        
        self.dest = self.data

        for block in AVAILABLES_LANG:
            self.dest = self.dest.replace("```" + block, "")

        self.dest = self.dest.replace("```", "")
        
        self.__process_redirects()
        self.__process_p_tags()
            
    def _metadata_dump(self):
        self.print(self._metadata.title)
        self.print(self._metadata.description)
        self.print(" - ".join(self._metadata.categories))
        self.print("By " + self._metadata.author) 
        
        msg = "Last edit: " + self._metadata.updated_at
        self.print(msg)
        self.print("-" * len(msg))
    
    def dump(self):
        self._metadata_dump()
        self.print(self.dest)
        
TO_CONVERT = {
    Document.GOPHER: GopherConvert,
    Document.GEMINI: GeminiConvert
}

class PostsConvert:
    """
        Converting a bunch of posts
    """
    
    def __init__(self, dir: str, _type: PostConvert):
        self.__dir = dir
        self.__type = _type
    
    def dump_to_files(self, dest_dir: str):
        """
            Parse then write into file
        """
        
        for root, _, files in os.walk(self.__dir):
            for file in files:
                path = os.path.join(root, file)
                converter = self.__type()
                
                converter.load_from_file(path)
                
                dest = file.replace(
                    ".md",
                    "." + converter.document.value
                )

                f = open(
                    dest_dir + "/" + dest,
                    "w+"
                )
                
                converter.set_f(f)
                converter.parse_and_dump()

def main():
    av = argv[1:]
    
    available_exts = tuple(
        map(
            lambda x: x.value,
            list(Document)
        )
    )

    if len(av) < 3:
        return
   
    (ext, dir, dest_dir) = av
    
    if not ext in available_exts:
        return
    
    document = Document._value2member_map_[ext]
    converter_proto = TO_CONVERT.get(document)

    if not converter_proto:
        return
    
    try:
        a = PostsConvert(
            dir,
            converter_proto
        )
        a.dump_to_files(dest_dir)
    except Exception as error:
        print(error, file=stderr)
    
if __name__ == "__main__":
    main()
