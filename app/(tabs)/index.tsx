import * as React from 'react';
// @ts-expect-error
import * as cheerio from 'react-native-cheerio';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { cssInterop } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

cssInterop(Image, { className: 'style' });
cssInterop(ScrollView, { className: 'contentContainerStyle' });

const images = [
  { uri: 'https://temp.compsci88.com/cover/Dandadan.jpg', title: 'Dandadan' },
  {
    uri: 'https://temp.compsci88.com/cover/One-Piece-Digital-Colored-Comics.jpg',
    title: 'One Piece',
  },
  {
    uri: 'https://temp.compsci88.com/cover/Spy-X-Family.jpg',
    title: 'Spy x Family',
  },
  {
    uri: 'https://temp.compsci88.com/cover/Kagurabachi.jpg',
    title: 'Kagurabachi',
  },
];

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function LibraryScreen() {
  const router = useRouter();
  const getTest = async () => {
    console.log('GETTING CALLED');
    const test = await fetch(
      'https://mangasee123.com/read-online/Solo-Leveling-Ragnarok-chapter-1.html',
    );
    const anotherTest = await test.text();
    const $ = cheerio.load(anotherTest);
    const finalScript: string = $('script').last().html();

    // looks like ["vm.CurChapter = {\"Chapter\":\"100010\",\"Type\":\"Chapter\",\"Page\":\"33\",\"Directory\":\"\",\"Date\":\"2024-07-31 21:24:50\",\"ChapterName\":null};"]
    const currentChapterMatch = finalScript.match(
      /vm\.CurChapter\s*=\s*\{.*\};/gm,
    )?.[0];
    const parsedSubstring = JSON.parse(
      currentChapterMatch?.substring(15, currentChapterMatch.length - 1) ?? '',
    );
    console.log(parsedSubstring.Chapter);
  };
  // https://scans-hot.planeptune.us/manga/Solo-Leveling-Ragnarok/0001-001.png
  return (
    <SafeAreaView className="flex-1 justify-center w-full items-center gap-5 p-4 bg-secondary/30">
      <ScrollView className="flex-row flex-wrap w-full justify-around gap-y-5 pb-12">
        {images.map((source, idx) => (
          <View key={idx}>
            <Pressable
              onPress={() => {
                router.push(`/title/${source.title}`);
              }}
            >
              <Image
                className="w-48 h-72"
                source={source.uri}
                placeholder={{ blurhash }}
                transition={1000}
              />
              <View className="bg-white absolute w-full bottom-0 items-center">
                <Text>{source.title}</Text>
              </View>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
