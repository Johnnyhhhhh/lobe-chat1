import { SearchBar } from '@lobehub/ui';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useIsMobile } from '@/hooks/useIsMobile';
import { useMarketStore } from '@/store/market';

const AgentSearchBar = memo<{ mobile?: boolean }>(({ mobile: controlledMobile }) => {
  const { t } = useTranslation('market');
  const [keywords, setKeywords] = useMarketStore((s) => [s.searchKeywords, s.setSearchKeywords]);
  const [value, setValue] = useState(keywords);
  const isMobile = useIsMobile();
  const mobile = controlledMobile ?? isMobile;

  const handleSearch = useCallback(() => {
    setKeywords(value);
  }, [value, setKeywords]);

  return (
    <SearchBar
      allowClear
      enableShortKey={!mobile}
      onChange={(e) => setValue(e.target.value)}
      onPressEnter={handleSearch}
      onSubmit={handleSearch}
      placeholder={t('search.placeholder')}
      shortKey={'k'}
      spotlight={!mobile}
      type={mobile ? 'block' : 'ghost'}
      value={value}
    />
  );
});

export default AgentSearchBar;
