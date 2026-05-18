import { useState, useMemo, useRef } from "react";
import { Search, SlidersHorizontal, ChevronDown, Users, TrendingUp, Star, UserPlus, ArrowUpDown } from "lucide-react";
import { PersonCard, type Person } from "./PersonCard";
import { FilterPanel, type FilterState } from "./FilterPanel";

const PERSONS: Person[] = [
  { id: 1, name: "Ирек Энварович Файзуллин", position: "Министр строительства и ЖКХ РФ", company: "Минстрой России", region: "Москва", bio: "Родился 8 декабря 1962 года в Казани. Кандидат экономических наук. С 2020 года — Министр строительства и ЖКХ Российской Федерации.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/09/slide-16_9-2-jpg.webp", tag: "top" },
  { id: 2, name: "Андрей Владимирович Иваненко", position: "Заместитель генерального директора", company: "Level Group", region: "Москва", bio: "Родился 29 июня 1987 года, женат, есть ребенок. Один из ключевых менеджеров Level Group.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/09/photo_5397772580032736741_y-1.webp" },
  { id: 3, name: "Дмитрий Владимирович Кутузов", position: "Генеральный директор", company: "Группа ЛСР", region: "Санкт-Петербург", bio: "Окончил Государственный университет экономики и финансов Санкт-Петербурга по специальности «Финансы и кредит».", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/09/kutuzov-lsr-1-jpeg.webp", tag: "top" },
  { id: 4, name: "Игнатий Сергеевич Данилиди", position: "Генеральный директор", company: "ГК А101", region: "Москва", bio: "До прихода в ГК «А101» занимал руководящие должности в ОАО «Система-Галс» и ООО «Дирекция капитального строительства» (Донстрой).", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/09/danilidi-jpg.webp" },
  { id: 5, name: "Владимир Александрович Воронин", position: "Основатель и президент", company: "ГК ФСК", region: "Москва", bio: "Родился 27 декабря 1975 г. Предприниматель, строитель в третьем поколении. Основал одного из крупнейших московских девелоперов.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/voronin-jpeg.webp", tag: "quoted" },
  { id: 6, name: "Анастасия Владимировна Маслёха", position: "Директор", company: "ГК ТОЧНО", region: "Краснодар", bio: "На разных этапах карьеры работала торговым представителем, директором филиала федерального рекламного холдинга в Краснодаре.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/masleha-2.png" },
  { id: 7, name: "Ян Леонидович Изак", position: "Генеральный директор, член Совета директоров", company: "Setl Group", region: "Санкт-Петербург", bio: "Родился 18 июня 1972 в Ленинграде. Женат, есть сын и дочь. Руководит крупнейшим девелопером Северо-Запада России.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/jan-izak-generalnyj-direktor-holdinga-setl-group-11ad064bfea1d1e2.webp", tag: "top" },
  { id: 8, name: "Алексей Николаевич Круковский", position: "Руководитель компании", company: "Брусника", region: "Екатеринбург", bio: "Родился в 1974 году в Челябинской области. С 2014 года живет и работает в Екатеринбурге. Развивает девелопмент в городах Урала.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/brusnika--jpeg.webp" },
  { id: 9, name: "Мария Александровна Литинецкая", position: "Генеральный директор, управляющий партнер", company: "MR Group", region: "Москва", bio: "Родилась 13 октября 1980 года в Москве. Замужем, воспитывает троих детей. Один из самых влиятельных руководителей отрасли.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/marija_litineckaja-jpg.webp", tag: "quoted" },
  { id: 10, name: "Юрий Иванович Иванов", position: "Генеральный директор", company: "ГК ЮгСтройИнвест", region: "Краснодар", bio: "Родился 3 февраля 1964 года в Ставропольском крае. Женат, есть двое детей. Руководит крупнейшим застройщиком Юга России.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/ivanov-jpg.webp" },
  { id: 11, name: "Александр Олегович Гайдуков", position: "Руководитель", company: "Страна Девелопмент", region: "Тюмень", bio: "Родился 14 июля 1980 года. Женат, воспитывает двоих детей. Реализует крупные девелоперские проекты в регионах России.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/a.-gajdukov-jpeg.webp" },
  { id: 12, name: "Алена Викторовна Дерябина", position: "Генеральный директор", company: "ДОНСТРОЙ", region: "Москва", bio: "Окончила Хабаровский институт народного хозяйства по специальности «Финансы и кредит» в 1991 году.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/ked7vzw0nuwpbq4q1yikzerlitum4uto-71611dd2d868385a.webp" },
  { id: 13, name: "Михаил Игоревич Бузулуцкий", position: "Президент", company: "Группа Эталон", region: "Санкт-Петербург", bio: "Окончил Санкт-Петербургский государственный университет экономики и финансов по специальности «Финансы и кредит».", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/buzluckij-jetalon-jpg.webp", tag: "top" },
  { id: 14, name: "Кирилл Игоревич Игнахин", position: "Генеральный директор", company: "Level Group", region: "Москва", bio: "Родился 15 ноября 1986 года в Калуге. Один из создателей и руководителей премиального девелопера Level Group.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/frame-89-38-8d0763230dc2e86c.webp" },
  { id: 15, name: "Ильшат Анварович Нигматуллин", position: "Президент", company: "ГК Гранель", region: "Москва", bio: "Родился 30 ноября 1971 года в Республике Башкортостан. Руководит одним из крупных девелоперов Подмосковья.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/photo_2024-10-01_17-19-44-jpg.webp" },
  { id: 16, name: "Павел Борисович Шевчук", position: "Экс-генеральный директор", company: "ГК Инград", region: "Москва", bio: "Родился 12 февраля 1973 года в Москве. Под его руководством Инград вошел в топ-10 крупнейших застройщиков России.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/shevchuk_ingrad.png" },
  { id: 17, name: "Сергей Викторович Гончаров", position: "Генеральный директор", company: "ГК Развитие", region: "Воронеж", bio: "Родился 22 мая 1981 года в Уссурийске. Развивает ГК «Развитие» в Центральном Черноземье России.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/frame-89-37-6f5c45dd4245d786.webp" },
  { id: 18, name: "Станислав Владиславович Киселев", position: "Генеральный директор", company: "ГК КОРТРОС", region: "Москва", bio: "Родился 22 сентября 1975 года в Свердловской области. Женат, имеет двоих детей. Реализует проекты в нескольких регионах России.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/kiselev-jpg.webp" },
  { id: 19, name: "Андрей Эдуардович Осколков", position: "Основатель", company: "КОМОССТРОЙ", region: "Ижевск", bio: "Родился 4 февраля 1964 года. Женат, воспитывает дочерей. Основатель одного из крупных застройщиков Удмуртии.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/oskolov_kom.png" },
  { id: 20, name: "Антон Сергеевич Воробьев", position: "Генеральный директор", company: "ГК ЕДИНСТВО", region: "Архангельск", bio: "Родился 18 июня 1980 года в Архангельской области. Развивает девелопмент на Русском Севере.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/frame-89-36-f7c07766fcc9383a.webp" },
  { id: 21, name: "Сергей Петрович Иванов", position: "Президент, председатель совета директоров", company: "Девелопмент-Юг", region: "Краснодар", bio: "Родился 7 ноября 1961 г. в Ростовской области. Один из крупнейших девелоперов юга России.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/ivanov-devedopment-jug-jpg-e1727975538250.webp" },
  { id: 22, name: "Юрий Александрович Тараскин", position: "Генеральный директор", company: "СК10", region: "Москва", bio: "Родился 27 октября 1973 года в Москве. Руководит одним из активно растущих столичных застройщиков.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/taraskin-e1727974353428.webp" },
  { id: 23, name: "Радик Ваккасович Салимгараев", position: "Генеральный директор", company: "Унистрой", region: "Казань", bio: "Родился 22 октября 1985 в Республике Татарстан. Женат. Реализует крупные жилые комплексы в Казани.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/salimgareev-jpg-e1727974840711.webp" },
  { id: 24, name: "Сергей Дмитриевич Ярошенко", position: "Генеральный директор", company: "КВС", region: "Санкт-Петербург", bio: "Родился 7 января 1975 года в Ленинграде. Руководит одним из ведущих петербургских застройщиков.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/jaroshenko-1-jpg-e1727975170445.webp" },
  { id: 25, name: "Николай Валентинович Коробов", position: "Генеральный директор", company: "ИСГ МАВИС", region: "Хабаровск", bio: "Родился 28 апреля 1973 года в Комсомольске-на-Амуре. Развивает девелопмент на Дальнем Востоке России.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/korobovvvv-jpg-e1727975802291.webp" },
  { id: 26, name: "Дмитрий Александрович Рябов", position: "Генеральный директор", company: "DARS", region: "Ульяновск", bio: "Родился 2 октября 1976 года в Ульяновске. Женат, воспитывает двух сыновей. Реализует крупные проекты в Поволжье.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/frame-89-2026-03-11t195611.174-483f4aeb8f0fd4c1.webp" },
  { id: 27, name: "Евгений Николаевич Дёмкин", position: "Генеральный директор", company: "АО ПЗСП", region: "Пермь", bio: "Родился 9 февраля 1977 года в Перми. Женат, воспитывает двоих сыновей. Руководит одним из крупных застройщиков Урала.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/demkin-jpg-e1727977487990.webp" },
  { id: 28, name: "Юрий Анатольевич Захаров", position: "Генеральный директор", company: "Железно", region: "Ижевск", bio: "Родился 9 апреля 1977 в Ижевске. Развивает девелопмент в Удмуртии и прилегающих регионах.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/frame-89-24-37069bb2d2441788.webp" },
  { id: 29, name: "Анатолий Александрович Давидюк", position: "Генеральный директор", company: "ГК Новый Дон", region: "Ростов-на-Дону", bio: "Родился 5 февраля 1965 года. Женат. Воспитывает пятерых детей: четыре сына и одну дочь.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/davidjuk-2-jpg-e1727977944765.webp" },
  { id: 30, name: "Андрей Иванович Соболев", position: "Генеральный директор", company: "АО СЗ ДСК", region: "Воронеж", bio: "Родился 11 августа 1974 года в Тамбовской области. Руководит одним из крупных региональных застройщиков.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/sobolev-jpg-e1727978114781.webp" },
  { id: 31, name: "Олег Владимирович Лакницкий", position: "Генеральный директор", company: "Трест Магнитострой", region: "Магнитогорск", bio: "Окончил Московский коммерческий институт. Руководит одним из старейших строительных трестов Южного Урала.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/laknickij-jpg-e1727978396243.webp" },
  { id: 32, name: "Павел Евгеньевич Дудулин", position: "Генеральный директор", company: "АО СЗ УЭЗ", region: "Казань", bio: "Родился 30 сентября 1981 года в Казани. Руководит застройщиком, специализирующимся на жилье в Татарстане.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/dudulin.png" },
  { id: 33, name: "Алексей Андреасович Алмазов", position: "Генеральный директор", company: "ФСК Регион", region: "Москва", bio: "Окончил Московский государственный строительный университет. Также имеет степень MBA по инновационному и проектному менеджменту.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/replicate-prediction-gkva3ennghrmt0cxndxrycvq3m-d14503bbedcc94da.webp" },
  { id: 34, name: "Александр Сергеевич Прыгунков", position: "Управляющий партнер", company: "Группа Самолет", region: "Москва", bio: "Окончил Волгоградский государственный университет. Один из ключевых менеджеров крупнейшего по объемам строительства застройщика.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/prgunkov-vernyj-jpg-e1727979201921.webp" },
  { id: 35, name: "Александр Николаевич Ломакин", position: "Первый заместитель Министра строительства и ЖКХ", company: "Минстрой России", region: "Москва", bio: "Окончил Московский государственный строительный университет в 2000 году. Имеет степень бакалавра и магистра.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/lomakin-jpg-e1728289674755.webp", tag: "top" },
  { id: 36, name: "Юрий Петрович Муценек", position: "Статс-секретарь — заместитель Министра строительства и ЖКХ РФ", company: "Минстрой России", region: "Москва", bio: "Первое образование получил в Казанском государственном архитектурно-строительном университете.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/img_2285-768x539-1.webp" },
  { id: 37, name: "Никита Евгеньевич Стасишин", position: "Заместитель Министра строительства и ЖКХ", company: "Минстрой России", region: "Москва", bio: "Родился 7 мая 1986 года в Санкт-Петербурге. Женат, есть дочь. Курирует вопросы жилищного строительства.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/frame-89-23-8c6e79b5444d6f2f.webp", tag: "quoted" },
  { id: 38, name: "Юрий Сергеевич Гордеев", position: "Заместитель Министра строительства и ЖКХ", company: "Минстрой России", region: "Москва", bio: "Родился 20 мая 1982 года в Томске. Женат. Отвечает за направление ЖКХ в Министерстве.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/gordeev-2-jpg-e1728290306815.webp" },
  { id: 39, name: "Сергей Григорьевич Музыченко", position: "Заместитель Министра строительства и ЖКХ", company: "Минстрой России", region: "Москва", bio: "Родился в 1984 году в Астраханской области. Курирует направление технического регулирования в строительстве.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/muzychenko-1-jpg-e1728290617455.webp" },
  { id: 40, name: "Константин Александрович Михайлик", position: "Заместитель Министра строительства и ЖКХ", company: "Минстрой России", region: "Москва", bio: "Родился 18 июля 1983 года в Приморском крае. Курирует вопросы цифровизации строительной отрасли.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/mihajlik-jpg-e1728295351550.webp" },
  { id: 41, name: "Алексей Васильевич Ересько", position: "Заместитель Министра строительства и ЖКХ", company: "Минстрой России", region: "Москва", bio: "Родился 26 декабря 1973 года. Женат, воспитывает двоих детей. Отвечает за строительство в новых регионах.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/ereskoj-2-poluchshe-jpg.webp" },
  { id: 42, name: "Валерий Владимирович Леонов", position: "Заместитель Министра строительства и ЖКХ", company: "Минстрой России", region: "Москва", bio: "Родился 16 января 1975 года в Казани. Курирует направление ценообразования в строительной отрасли.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/leonov-jpg.webp" },
  { id: 43, name: "Алмаз Шаукатович Хусаинов", position: "Заместитель Министра строительства и ЖКХ", company: "Минстрой России", region: "Москва", bio: "Окончил Российский университет дружбы народов в 2012 году. Отвечает за международное сотрудничество.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/humainov-jpg-e1728296556665.webp" },
  { id: 44, name: "Сергей Александрович Пахомов", position: "Председатель Комитета Государственной Думы по строительству и ЖКХ", company: "Государственная Дума РФ", region: "Москва", bio: "Родился 6 августа 1975 года в Сергиевом Посаде. Законодательно регулирует строительную отрасль России.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/pahomov-768x431-1.webp", tag: "top" },
  { id: 45, name: "Марат Шакирзянович Хуснуллин", position: "Заместитель Председателя Правительства РФ", company: "Правительство РФ", region: "Москва", bio: "Родился 9 августа 1966 года в Казани. Курирует строительную отрасль и ЖКХ в Правительстве России.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/husnullin2-jpg-e1728304381265.webp", tag: "top" },
  { id: 46, name: "Владимир Алексеевич Кошелев", position: "Первый зампред Комитета Госдумы по строительству и ЖКХ", company: "Государственная Дума РФ", region: "Самара", bio: "Родился 1 октября 1974 года в Куйбышеве (Самаре). Крупный предприниматель и законодатель в строительной сфере.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/frame-89-22-dc1e029c0ea98cbf.webp" },
  { id: 47, name: "Сергей Семенович Собянин", position: "Мэр Москвы", company: "Правительство Москвы", region: "Москва", bio: "Родился 21 июня 1958 года в Тюменской области. Руководит Москвой с 2010 года, реализует масштабные программы жилой застройки.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/sobjanin-3-jpg-e1728305057265.webp", tag: "top" },
  { id: 48, name: "Иван Николаевич Поландов", position: "Операционный директор", company: "ПИК", region: "Москва", bio: "Родился 18 сентября 1984 года. Женат. Есть двое детей. Обеспечивает операционную деятельность крупнейшего застройщика России.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/palandov-jpeg.webp" },
  { id: 49, name: "Ерванд Оникович Карапетян", position: "Генеральный директор", company: "ПИК", region: "Москва", bio: "Был руководителем нескольких предприятий, входящих в структуру ПИК. Возглавил компанию после реорганизации.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/karapetjaenn-jpg-e1728306527155.webp" },
  { id: 50, name: "Денис Сергеевич Морозов", position: "Президент", company: "DOGMA", region: "Краснодар", bio: "Родился 22 марта 1981 года в Краснодаре. Развивает DOGMA как одного из ведущих девелоперов юга России.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/03/dscf7238-1-1-fotor-20250331165815.png" },
  { id: 51, name: "Александр Иванович Мелишев", position: "Генеральный директор", company: "ГК ССК", region: "Краснодар", bio: "Учредитель Ассоциации застройщиков Краснодарского края и республики Адыгея. Ключевой игрок рынка Кубани.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/frame-89-11-dba4db450db409b7.webp" },
  { id: 52, name: "Константин Михайлович Макаров", position: "Генеральный директор", company: "Талан", region: "Ижевск", bio: "Руководит одним из активно растущих федеральных девелоперов, реализующих проекты в десятках городов России.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/replicate-prediction-2nyg49xzr9rmr0cx0mz94tf43m-4a05f71eccdd736a.webp" },
  { id: 53, name: "Юрий Алексеевич Романович", position: "Директор", company: "TEN девелопмент", region: "Екатеринбург", bio: "С 2001 по 2005 годы прошел путь от специалиста до начальника отдела судебной защиты. Развивает жилое строительство на Урале.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/romanovich_ten-development-jpg.webp" },
  { id: 54, name: "Дмитрий Александрович Рогатых", position: "Генеральный директор", company: "Группа Аквилон", region: "Санкт-Петербург", bio: "Руководит одним из активных девелоперов, работающих в Санкт-Петербурге, Москве и на Русском Севере.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/rogatyh-jpg-e1728308505409.webp" },
  { id: 55, name: "Руслан Рамазанович Воруков", position: "Генеральный директор", company: "СК Семья", region: "Краснодар", bio: "Генеральный директор строительной компании «Семья», работающей на рынке жилой недвижимости Краснодарского края.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/frame-89-9-c2e1e91ba328c446.webp" },
  { id: 56, name: "Ваган Арсенович Арутюнян", position: "Президент", company: "AVA Group", region: "Краснодар", bio: "Родился в 1981 году в Краснодарском крае. Бизнесмен, общественный деятель. Один из ведущих девелоперов Юга России.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2024/10/frame-89-8-9ab311f09098aa7f.webp" },
  { id: 57, name: "Андрей Константинович Полетика", position: "Генеральный директор", company: "Sminex", region: "Москва", bio: "53 года, родился и вырос в Москве. Женат, воспитывает двух дочерей. В свободное время играет в хоккей, пишет прозу.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/01/poletika-scaled.webp" },
  { id: 58, name: "Елена Валериевна Низамова", position: "Генеральный директор", company: "ГК ЭНКО", region: "Уфа", bio: "Родилась 3 октября. Имеет высшее экономическое образование, MBA. Развивает жилое строительство в Башкирии.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/01/gnizamova.webp" },
  { id: 59, name: "Андрей Юрьевич Молчанов", position: "Основатель девелоперской группы", company: "ЛСР", region: "Санкт-Петербург", bio: "Родился 24 сентября 1971 года в Санкт-Петербурге. Женат, воспитывает шестерых детей. Создал крупнейший петербургский холдинг.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/02/replicate-prediction-qh7tf1n27hrmy0cx036978dskg-314d88b93a52fbcc.webp", tag: "top" },
  { id: 60, name: "Дмитрий Борисович Кашинский", position: "Президент", company: "GloraX", region: "Санкт-Петербург", bio: "Родился 25 февраля 1971 в Москве. Окончил Московский авиационный институт (МАИ). Руководит федеральным девелопером GloraX.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/02/img_2395.webp" },
  { id: 61, name: "Светлана Александровна Опрышко", position: "Директор портала", company: "Всеостройке.рф", region: "Москва", bio: "Родилась 15 марта в Кемерово. Замужем. Основатель и главный редактор ведущего отраслевого портала.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/02/sv.webp" },
  { id: 62, name: "Александр Валерьевич Ручьёв", position: "Председатель совета директоров, президент", company: "ГК Основа", region: "Москва", bio: "Родился в 1973 году в Северодвинске. Женат, воспитывает троих детей. Реализует проекты в Москве и Подмосковье.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/02/rechev-4.webp" },
  { id: 63, name: "Игорь Викторович Евтушевский", position: "Сооснователь", company: "Группа Самолет", region: "Москва", bio: "Родился 25 сентября 1965 года в Саратове. Один из создателей крупнейшего по объему строительства застройщика России.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/03/evtush_original.webp" },
  { id: 64, name: "Антон Николаевич Елистратов", position: "Сооснователь", company: "Azurro", region: "Москва", bio: "Родился 17 июля 1981 года в Москве. Основал международную девелоперскую компанию, работающую в нескольких странах.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/03/elstratov_original.webp", tag: "new" },
  { id: 65, name: "Сергей Эдуардович Гордеев", position: "Акционер", company: "ГК ПИК", region: "Москва", bio: "Родился 22 ноября 1972 года в Москве. Создал крупнейшего застройщика России — ПИК. Предприниматель и меценат.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/03/gorleev.webp", tag: "top" },
  { id: 66, name: "Максим Валерьевич Шубарев", position: "Председатель Совета директоров", company: "Setl Group", region: "Санкт-Петербург", bio: "Родился 25 мая 1968 года в Ленинграде. Женат, воспитывает троих детей. Основал крупнейший петербургский девелопер.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/03/shubarev.webp", tag: "top" },
  { id: 67, name: "Год Семенович Нисанов", position: "Совладелец группы", company: "Киевская площадь", region: "Москва", bio: "Родился 24 апреля 1972 года в Азербайджанской ССР. Один из крупнейших владельцев коммерческой недвижимости Москвы.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/03/nisanov.webp" },
  { id: 68, name: "Александр Александрович Светаков", position: "Совладелец", company: "Инвестиционная Группа Абсолют", region: "Москва", bio: "Родился 15 февраля 1968 года в Москве. Женат, воспитывает пятерых детей. Крупный инвестор в недвижимость.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/03/svetakov.webp" },
  { id: 69, name: "Ильдар Борисович Хусаинов", position: "Основатель и руководитель", company: "Этажи", region: "Тюмень", bio: "Родился 14 августа 1980 года в Тюмени. Женат, воспитывает троих детей. Создал крупнейшую риелторскую сеть России.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/03/hus-2.webp", tag: "quoted" },
  { id: 70, name: "Голубицкий Вениамин Максович", position: "Президент", company: "ГК КОРТРОС", region: "Москва", bio: "Родился 28 апреля 1957 года в Перми. Женат. Руководит федеральным девелопером с проектами в крупных городах России.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/04/goubic_original.webp" },
  { id: 71, name: "Гарипов Ильдар Радисович", position: "Генеральный директор", company: "ГК Первый Трест", region: "Уфа", bio: "Окончил Уфимский государственный нефтяной университет по специальности «Промышленное и гражданское строительство».", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/04/garipov.webp" },
  { id: 72, name: "Биржин Андрей Александрович", position: "Основатель", company: "GloraX", region: "Санкт-Петербург", bio: "Родился 12 апреля 1981 года в Ивановской области. Женат, воспитывает двоих детей. Создал федерального девелопера GloraX.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/12/cropped_image.jpeg", tag: "new" },
  { id: 73, name: "Кузнецов Сергей Олегович", position: "Главный архитектор Москвы", company: "Правительство Москвы", region: "Москва", bio: "Родился 25 июля 1977 года в Москве. Определяет архитектурный облик российской столицы и задает стандарты в отрасли.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/12/cropped_image-1.jpeg", tag: "quoted" },
  { id: 74, name: "Пискулин Илья Андреевич", position: "Основатель форума недвижимости", company: "Движение", region: "Тюмень", bio: "Родился в Тюмени 3 августа 1987 года. Женат, воспитывает сына. Организатор крупнейшего форума российских девелоперов.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/12/cropped_image-1-1.jpeg", tag: "new" },
  { id: 75, name: "Тулупов Алексей Викторович", position: "Президент", company: "Sminex", region: "Москва", bio: "Родился 18 мая 1975 года в Москве. Женат, воспитывает троих детей. Руководит одним из ведущих премиальных девелоперов.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/12/tulupov-2.jpg" },
  { id: 76, name: "Щиголь Александр Степанович", position: "Генеральный директор", company: "Брусника", region: "Екатеринбург", bio: "Родился 18 марта. Женат, воспитывает дочь. Руководит одним из ведущих застройщиков Уральского региона.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/12/cropped_image-2.jpeg" },
  { id: 77, name: "Хасанова Ольга Рафиковна", position: "Основатель экосистемы", company: "URBAN", region: "Москва", bio: "Родилась в Душанбе. Замужем, воспитывает двоих детей. Создала крупнейшую аналитическую платформу рынка новостроек.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/12/cropped_image-3.jpeg", tag: "new" },
  { id: 78, name: "Трубников Дмитрий Александрович", position: "Генеральный директор", company: "ГК ФСК", region: "Москва", bio: "Родился в Магнитогорске 16 октября 1979 года. Возглавляет один из крупных московских девелоперов.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/12/trubnikov-752x423-1.jpg" },
  { id: 79, name: "Анна Николаевна Акиньшина", position: "Генеральный директор", company: "Группа Самолет", region: "Москва", bio: "С отличием окончила магистратуру. Имеет международную квалификацию CIMA. Первая женщина во главе публичного девелопера.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/01/akinshina.webp", tag: "new" },
  { id: 80, name: "Николай Андреевич Амосов", position: "Владелец, председатель Совета директоров", company: "ГК ТОЧНО", region: "Краснодар", bio: "Родился 27 ноября 1983 года в Краснодаре. «Девелопер года» по версии премии URBAN-2025. Женат, воспитывает восьмерых детей.", photoUrl: "https://xn--b1agapfwapgcl.xn--p1ai/wp-content/uploads/2025/02/amosov2.webp", tag: "quoted" },
];

const ALPHABET = ["Все", "А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Э", "Ю", "Я"];
const ALL_COMPANIES = Array.from(new Set(PERSONS.map(p => p.company))).sort();
const ALL_REGIONS = Array.from(new Set(PERSONS.map(p => p.region))).sort();

type SortMode = "alpha" | "cited" | "new";
const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "alpha", label: "По алфавиту ↓" },
  { value: "cited", label: "По цитируемости" },
  { value: "new", label: "Новые" },
];

const ITEMS_PER_PAGE = 12;
const EMPTY_FILTERS: FilterState = { positions: [], companies: [], regions: [], citationLevel: "" };

export function PersonsPage() {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState("Все");
  const [sortMode, setSortMode] = useState<SortMode>("alpha");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const activeFilterCount =
    filters.positions.length + filters.companies.length + filters.regions.length + (filters.citationLevel ? 1 : 0);

  const filtered = useMemo(() => {
    let list = PERSONS.filter(p => {
      const q = search.toLowerCase();
      const matchSearch = !search ||
        p.name.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.position.toLowerCase().includes(q);

      const lastName = p.name.split(" ").slice(1).join(" ") || p.name;
      const matchLetter = activeLetter === "Все" ||
        lastName[0]?.toUpperCase() === activeLetter ||
        p.name[0]?.toUpperCase() === activeLetter;

      const matchPositions = filters.positions.length === 0 ||
        filters.positions.some(pos => p.position.toLowerCase().includes(pos.toLowerCase()));
      const matchCompanies = filters.companies.length === 0 || filters.companies.includes(p.company);
      const matchRegions = filters.regions.length === 0 || filters.regions.includes(p.region);
      const matchCitation = !filters.citationLevel || p.tag === filters.citationLevel;

      return matchSearch && matchLetter && matchPositions && matchCompanies && matchRegions && matchCitation;
    });

    if (sortMode === "alpha") {
      list = [...list].sort((a, b) => {
        const aL = a.name.split(" ").slice(1).join(" ") || a.name;
        const bL = b.name.split(" ").slice(1).join(" ") || b.name;
        return aL.localeCompare(bL, "ru");
      });
    } else if (sortMode === "cited") {
      const order = { quoted: 0, top: 1, new: 2 };
      list = [...list].sort((a, b) => (order[a.tag ?? "new"] ?? 3) - (order[b.tag ?? "new"] ?? 3));
    } else if (sortMode === "new") {
      list = [...list].sort((a, b) => {
        if (a.tag === "new" && b.tag !== "new") return -1;
        if (b.tag === "new" && a.tag !== "new") return 1;
        return b.id - a.id;
      });
    }
    return list;
  }, [search, activeLetter, sortMode, filters]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const topPersons = PERSONS.filter(p => p.tag === "top").slice(0, 6);
  const newPersons = PERSONS.filter(p => p.tag === "new").slice(0, 5);
  const quotedPersons = PERSONS.filter(p => p.tag === "quoted").slice(0, 4);

  const setPageAndScroll = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentSort = SORT_OPTIONS.find(s => s.value === sortMode)!;

  return (
    <main style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E2E6EA", padding: "36px 0 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>

          {/* Back link */}
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: "'Fira Sans', sans-serif", fontSize: "15px", color: "#2e2d2d", textDecoration: "none", marginBottom: "28px" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#477AA2")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#2e2d2d")}
          >
            <span style={{ fontSize: "18px", lineHeight: 1 }}>←</span> Вернуться на главную
          </a>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "40px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "300px" }}>
              {/* Badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#E8B923", borderRadius: "5px", padding: "8px 14px", marginBottom: "16px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2e2d2d", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: "12px", fontWeight: 500, color: "#2e2d2d", textTransform: "uppercase", letterSpacing: "1.2px" }}>
                  Новый раздел
                </span>
              </div>

              <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "clamp(32px, 3.8vw, 52px)", lineHeight: "1.12", marginBottom: "12px" }}>
                <span style={{ color: "#2e2d2d" }}>Первые лица</span><br />
                <span style={{ color: "#E95422" }}>российской недвижимости</span>
              </h1>

              <p style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: "18px", color: "#1c3458", lineHeight: 1.6, maxWidth: "600px" }}>
                Руководители и топ-менеджеры ведущих российских застройщиков — биографии, карьера, должности и компании.
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "40px", flexShrink: 0, alignItems: "flex-start", paddingTop: "8px" }}>
              {[
                { value: PERSONS.length.toString(), label: "Персон" },
                { value: ALL_COMPANIES.length.toString(), label: "Компаний" },
                { value: ALL_REGIONS.length.toString(), label: "Регионов" },
              ].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "42px", color: "#2e2d2d", lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: "13px", color: "#777777", marginTop: "6px", letterSpacing: "0.97px" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search + Sort + Filter row */}
          <div style={{ marginTop: "36px", display: "flex", gap: "14px", alignItems: "stretch", flexWrap: "wrap" }}>
            {/* Search */}
            <div style={{ flex: 1, minWidth: "300px", position: "relative" }}>
              <div style={{ position: "absolute", left: "24px", top: "50%", transform: "translateY(-50%)", color: "#9AA5B1", pointerEvents: "none" }}>
                <Search size={20} />
              </div>
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Поиск по имени, компании, должности..."
                style={{
                  width: "100%",
                  height: "78px",
                  paddingLeft: "62px",
                  paddingRight: search ? "110px" : "26px",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: "13px",
                  fontFamily: "'Fira Sans', sans-serif",
                  fontSize: "17px",
                  color: "#1A1A1A",
                  backgroundColor: "#FEFEFE",
                  outline: "none",
                  boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                  boxSizing: "border-box",
                }}
                onFocus={e => { e.target.style.borderColor = "#477AA2"; e.target.style.boxShadow = "0 0 0 3px rgba(71,122,162,0.12)"; }}
                onBlur={e => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "0 1px 5px rgba(0,0,0,0.05)"; }}
              />
              {search && (
                <button onClick={() => { setSearch(""); setPage(1); }} style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", background: "#F0F2F5", border: "none", borderRadius: "6px", padding: "4px 10px", color: "#555555", fontFamily: "'Fira Sans', sans-serif", fontSize: "13px", cursor: "pointer" }}>
                  Очистить
                </button>
              )}
            </div>

            {/* Sort dropdown */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <button
                onClick={() => setSortOpen(!sortOpen)}
                style={{
                  height: "78px",
                  padding: "0 32px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: "10px",
                  background: "#FEFEFE",
                  fontFamily: "'Fira Sans', sans-serif",
                  fontSize: "18px",
                  color: "#2e2d2d",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                {currentSort.label}
                <ChevronDown size={18} style={{ color: "#9AA5B1", transform: sortOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              {sortOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, minWidth: "220px", backgroundColor: "#FFFFFF", border: "1.5px solid #e5e7eb", borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 100, overflow: "hidden" }}>
                  {SORT_OPTIONS.map(opt => (
                    <button key={opt.value} onClick={() => { setSortMode(opt.value); setSortOpen(false); setPage(1); }}
                      style={{
                        display: "block", width: "100%", textAlign: "left", padding: "13px 20px",
                        background: sortMode === opt.value
                          ? "linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.05)), #F8F9FA"
                          : "transparent",
                        color: "#2e2d2d", fontFamily: "'Fira Sans', sans-serif", fontSize: "16px",
                        border: "none", borderBottom: "1px solid #F0F2F5", cursor: "pointer",
                        fontWeight: sortMode === opt.value ? 600 : 400,
                      }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filters button */}
            <button
              onClick={() => setFilterOpen(true)}
              style={{
                height: "78px",
                padding: "0 24px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: activeFilterCount > 0 ? "1.5px solid #E95422" : "1.5px solid #e5e7eb",
                borderRadius: "13px",
                background: activeFilterCount > 0 ? "#FEF1EC" : "#FEFEFE",
                fontFamily: "'Fira Sans', sans-serif",
                fontSize: "18px",
                fontWeight: activeFilterCount > 0 ? 600 : 400,
                color: activeFilterCount > 0 ? "#C8451C" : "#2e2d2d",
                cursor: "pointer",
                whiteSpace: "nowrap",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                flexShrink: 0,
              }}
            >
              <SlidersHorizontal size={17} color="#9AA5B1" />
              Фильтры
              {activeFilterCount > 0 && (
                <span style={{ background: "#E95422", color: "#FFFFFF", fontSize: "11px", fontWeight: 700, borderRadius: "10px", padding: "2px 7px", marginLeft: "2px" }}>
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ── ALPHABET BAR ── */}
      <div style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E2E6EA", position: "sticky", top: "96px", zIndex: 40 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none", gap: "2px", padding: "10px 0" }}>
            {ALPHABET.map(letter => (
              <button
                key={letter}
                onClick={() => { setActiveLetter(letter); setPage(1); }}
                style={{
                  flexShrink: 0,
                  minWidth: letter === "Все" ? "48px" : "34px",
                  padding: "6px 8px",
                  borderRadius: "6px",
                  fontFamily: "'Fira Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: activeLetter === letter ? 700 : 400,
                  color: activeLetter === letter ? "#FFFFFF" : "#888888",
                  background: activeLetter === letter ? "#0A5494" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  textAlign: "center",
                }}
                onMouseEnter={e => { if (activeLetter !== letter) (e.currentTarget as HTMLElement).style.background = "#F0F2F5"; }}
                onMouseLeave={e => { if (activeLetter !== letter) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 40px 80px" }}>
        <div style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>

          {/* Grid area */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Results row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
              <p style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: "14px", color: "#888888" }}>
                Найдено:{" "}
                <span style={{ color: "#1A1A1A", fontWeight: 600 }}>{filtered.length}</span>{" "}
                {filtered.length % 10 === 1 && filtered.length % 100 !== 11 ? "персона" : filtered.length % 10 >= 2 && filtered.length % 10 <= 4 && (filtered.length % 100 < 10 || filtered.length % 100 >= 20) ? "персоны" : "персон"}
              </p>
              {activeFilterCount > 0 && (
                <button onClick={() => { setFilters(EMPTY_FILTERS); setPage(1); }} style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: "13px", color: "#E53E3E", background: "transparent", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                  Сбросить фильтры
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "20px", fontWeight: 700, color: "#1A1A1A", marginBottom: "8px" }}>Ничего не найдено</div>
                <div style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: "15px", color: "#555555" }}>Попробуйте изменить запрос или сбросить фильтры</div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "34px" }}>
                {paginated.map(person => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "64px", flexWrap: "wrap" }}>
                <button
                  onClick={() => setPageAndScroll(Math.max(1, page - 1))}
                  disabled={page === 1}
                  style={{ padding: "11px 24px", borderRadius: "10px", border: "1.5px solid #E2E6EA", background: "transparent", fontFamily: "'Montserrat', sans-serif", fontSize: "14px", fontWeight: 700, color: page === 1 ? "#CBD2D9" : "#2e2d2d", cursor: page === 1 ? "not-allowed" : "pointer", opacity: page === 1 ? 0.3 : 1, display: "flex", alignItems: "center", gap: "6px" }}
                >
                  ← Назад
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPageAndScroll(p)}
                    style={{ width: "48px", height: "48px", borderRadius: "10px", border: p === page ? "none" : "1px solid rgba(0,0,0,0.05)", background: p === page ? "#0a5494" : "transparent", fontFamily: "'Fira Sans', sans-serif", fontSize: "17px", fontWeight: p === page ? 700 : 400, color: p === page ? "#FFFFFF" : "#2e2d2d", cursor: "pointer", transition: "all 0.15s" }}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPageAndScroll(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  style={{ padding: "11px 24px", borderRadius: "10px", border: "1.5px solid #E2E6EA", background: "transparent", fontFamily: "'Montserrat', sans-serif", fontSize: "14px", fontWeight: 700, color: page === totalPages ? "#CBD2D9" : "#2e2d2d", cursor: page === totalPages ? "not-allowed" : "pointer", opacity: page === totalPages ? 0.3 : 1, display: "flex", alignItems: "center", gap: "6px" }}
                >
                  Вперёд →
                </button>
              </div>
            )}
          </div>

          {/* ── STICKY SIDEBAR ── */}
          <aside ref={sidebarRef} style={{ width: "300px", flexShrink: 0, position: "sticky", top: "160px", display: "flex", flexDirection: "column", gap: "26px" }} className="hidden xl:flex">
            <SidebarBlock title="Топ персоны" icon={<Star size={16} />} persons={topPersons} accentColor="#477aa2" />
            <SidebarBlock title="Часто цитируют" icon={<TrendingUp size={16} />} persons={quotedPersons} accentColor="#E95422" />
            <SidebarBlock title="Новые персоны" icon={<UserPlus size={16} />} persons={newPersons} accentColor="#E95422" />
          </aside>
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        allCompanies={ALL_COMPANIES}
        allRegions={ALL_REGIONS}
        filters={filters}
        onApply={f => { setFilters(f); setPage(1); }}
      />
    </main>
  );
}

function SidebarBlock({ title, icon, persons, accentColor }: {
  title: string;
  icon: React.ReactNode;
  persons: Person[];
  accentColor: string;
}) {
  return (
    <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "0.75px solid #e2e6ea", overflow: "hidden", boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}>
      {/* Header */}
      <div style={{ padding: "16px 24px 18px", borderBottom: "0.75px solid #e5e7eb", display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ color: accentColor }}>{icon}</span>
        <span style={{ fontFamily: "'Fira Sans', sans-serif", fontWeight: 600, fontSize: "17px", color: "#1A1A1A" }}>
          {title}
        </span>
      </div>
      {/* List */}
      {persons.map((p, i) => (
        <a
          key={p.id}
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "16px 24px",
            borderBottom: i < persons.length - 1 ? "0.75px solid #e5e7eb" : "none",
            textDecoration: "none",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "#F8F9FA")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
        >
          <div style={{ width: "51px", height: "51px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
            <img src={p.photoUrl} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: "15px", fontWeight: 500, color: "#1A1A1A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1.4 }}>
              {p.name}
            </div>
            <div style={{ fontFamily: "'Fira Sans', sans-serif", fontSize: "14px", color: "#888888", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1.4 }}>
              {p.company}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
