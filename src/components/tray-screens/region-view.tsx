import { COLORS } from "@/design/tokens";
import { useTray } from "@/hooks/use-tray";
import type { IRegionView } from "@/interface/tray-screens.interface";
import { SymbolView } from "expo-symbols";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SheetHeader } from "./boost-shared";

export default function RegionView({
  options,
  selectedValue,
  onSelect,
}: IRegionView) {
  const { goBack, view } = useTray();
  const [query, setQuery] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (view === "region") {
      inputRef.current?.focus();
    }
  }, [view]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return options.filter((option) => option.label.toLowerCase().includes(q));
  }, [options, query]);

  const leave = useCallback((action: () => void) => {
    Keyboard.dismiss();
    action();
  }, []);

  const select = useCallback(
    (value: string) =>
      leave(() => {
        onSelect(value);
        goBack();
      }),
    [goBack, leave, onSelect],
  );

  return (
    <View style={[styles.container]}>
      <SheetHeader title="Region" onBack={() => leave(goBack)} />

      <View style={styles.searchField}>
        <SymbolView
          name="magnifyingglass"
          tintColor={COLORS.MUTED_FOREGROUND}
          size={18}
        />
        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          placeholder="Search Country, City, or Region"
          placeholderTextColor={COLORS.MUTED_FOREGROUND}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          returnKeyType="search"
        />
      </View>

      {query.trim() ?
        <ScrollView
          style={styles.results}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {results.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => select(option.value)}
              style={({ pressed }) => [
                styles.resultRow,
                pressed && styles.pressed,
              ]}
            >
              <SymbolView
                name="mappin.circle.fill"
                tintColor={COLORS.FOREGROUND}
                size={20}
              />
              <Text style={styles.resultLabel}>{option.label}</Text>
              {option.value === selectedValue ?
                <SymbolView
                  name="checkmark"
                  tintColor={COLORS.FOREGROUND}
                  size={16}
                />
              : null}
            </Pressable>
          ))}
          {results.length === 0 ?
            <Text style={styles.noResults}>No regions found</Text>
          : null}
        </ScrollView>
      : <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            Search for a location or boost globally
          </Text>
          <Pressable
            onPress={() => select("global")}
            style={({ pressed }) => [
              styles.globalPill,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.globalLabel}>Boost Global</Text>
          </Pressable>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: { minHeight: 380 },
  pressed: { opacity: 0.7 },
  searchField: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 40,
    borderRadius: 99,
    paddingHorizontal: 16,
    marginTop: 12,
    backgroundColor: COLORS.SURFACE_ELEVATED,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.FOREGROUND,
    padding: 0,
  },
  results: {
    marginTop: 12,
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
  },
  resultLabel: {
    flex: 1,
    fontSize: 17,
    fontWeight: "500",
    color: COLORS.FOREGROUND,
  },
  noResults: {
    fontSize: 15,
    color: COLORS.MUTED_FOREGROUND,
    textAlign: "center",
    paddingVertical: 28,
  },
  emptyState: {
    alignItems: "center",
    gap: 18,
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 17,
    color: COLORS.FOREGROUND,
    textAlign: "center",
  },
  globalPill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    paddingVertical: 6,
    paddingHorizontal: 22,
  },
  globalLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.FOREGROUND,
  },
});
